// Copyright (c) 2018 Dirk Schumacher, Noam Ross, Rich FitzJohn
// Copyright (c) 2024 Jinhwan Kim
import { 
  app, 
  session, 
  BrowserWindow 
} from 'electron'

import path from 'path'
import http from 'axios'
import os from 'os'
import execa from 'execa'
import { 
  randomPort, 
  waitFor, 
  getRPath 
} from './helpers'

const rPath = getRPath(os.platform())

let shutdown = false;

const rpath = path.join(app.getAppPath(), rPath)
const libPath = path.join(rpath, 'library')
const rscript = path.join(rpath, 'bin', 'R')
const shinyAppPath = path.join(app.getAppPath(), 'shiny')

const backgroundColor = '#2c3e50';

let rShinyProcess = null;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

const tryStartWebserver = async (attempt, progressCallback, onErrorStartup, onErrorLater, onSuccess) => {
   if (attempt > 100) {
     await progressCallback({attempt: attempt, code: 'failed'})
     await onErrorStartup()
     return
   }

   if (rShinyProcess !== null) {
     await onErrorStartup() // should not happen
     return
   }

   let shinyPort = randomPort()

   await progressCallback({attempt: attempt, code: 'start'})

   let shinyRunning = false
   const onError = async (e) => {
     console.error(e)
     rShinyProcess = null
     if (shutdown) { // global state :(
       return
     }
     if (shinyRunning) {
       await onErrorLater()
     } else {
       await tryStartWebserver(attempt + 1, progressCallback, onErrorStartup, onErrorLater, onSuccess)
     }
   }

   let shinyProcessAlreadyDead = false
   rShinyProcess = execa(rscript,
     ['--vanilla', '-f', path.join(app.getAppPath(), 'start-shiny.R')], { 
       env: {
         'WITHIN_ELECTRON': '1', 
         'RHOME': rpath,
         'R_HOME_DIR': rpath,
         'RE_SHINY_PORT': shinyPort,
         'RE_SHINY_PATH': shinyAppPath,
         'R_LIBS': libPath,
         'R_LIBS_USER': libPath,
         'R_LIBS_SITE': libPath,
         'R_LIB_PATHS': libPath} }).catch((e) => {
           shinyProcessAlreadyDead = true
           onError(e)
         })

  let url = `http://127.0.0.1:${shinyPort}`
  for (let i = 0; i <= 50; i++) {
    if (shinyProcessAlreadyDead) { break }
    await waitFor(500)
    try {
      const res = await http.head(url, {timeout: 1000})
      if (res.status === 200) {
        await progressCallback({attempt: attempt, code: 'success'})
        shinyRunning = true
        onSuccess(url)
        return
      }
    } catch (e) { }
  }
  await progressCallback({attempt: attempt, code: 'notresponding'})

  try { rShinyProcess.kill() } catch (e) {}
}

let mainWindow
let loadingSplashScreen
let errorSplashScreen

const createWindow = (shinyUrl) => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    // icon: __dirname + '/favicon.ico',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.loadURL(shinyUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const splashScreenOptions = {
  width: 1600,
  height: 900,
  backgroundColor: backgroundColor
}

const createSplashScreen = (filename) => {
  let splashScreen = new BrowserWindow(splashScreenOptions);
  splashScreen.loadURL(`file://${__dirname}/${filename}.html`)
  splashScreen.on('closed', () => { splashScreen = null })
  return splashScreen
}

const createLoadingSplashScreen = () => {
  loadingSplashScreen = createSplashScreen('loading')
}

const createErrorScreen = () => {
  errorSplashScreen = createSplashScreen('failed')
}

app.on('ready', async () => {
  // Set a content security policy
  session.defaultSession.webRequest.onHeadersReceived((_, callback) => {
    callback({
      responseHeaders: `
        default-src 'none';
        script-src 'self';
        img-src 'self' data:;
        style-src 'self';
        font-src 'self';
    `})
  })

  session.defaultSession.setPermissionRequestHandler((_1, _2, callback) => {
    callback(false)
  })

  createLoadingSplashScreen()

  const emitSpashEvent = async (event, data) => {
    try {
      await loadingSplashScreen.webContents.send(event, data)
    } catch (e) {}
  }

  const progressCallback = async (event) => {
    await emitSpashEvent('start-webserver-event', event)
  }

  const onErrorLater = async () => {
    if (!mainWindow) { return }
    createErrorScreen()
    await errorSplashScreen.show()
    mainWindow.destroy()
  }

  const onErrorStartup = async () => {
    await waitFor(10000) // TODO: hack, only emit if the loading screen is ready
    await emitSpashEvent('failed')
  }

  try {
    await tryStartWebserver(0, progressCallback, onErrorStartup, onErrorLater, (url) => {
      createWindow(url)
      loadingSplashScreen.destroy()
      loadingSplashScreen = null
      mainWindow.show()
    })
  } catch (e) {
    await emitSpashEvent('failed')
  }
})

app.on('window-all-closed', () => {
  shutdown = true
  app.quit()
  try {
  rShinyProcess.kill()
  } catch (e) {}
})
