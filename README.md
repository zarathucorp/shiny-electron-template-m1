# How to Make an R Shiny Electron App (2023, M1) {#how-to-make-an-r-shiny-electron-app}

A setup guide by L. Abigail Walter <br> Instructions adapted from <a href="https://www.travishinkelman.com/post/deploy-shiny-electron/">Travis Hinkelman</a> <br> R Shiny Electron template created by <a href="https://github.com/dirkschumacher/r-shiny-electron">Dirk Shumacher</a> Template updated by <a href="https://github.com/jhk0530" target = "_blank">Jinhwan Kim</a> <br>

for more info, see previous <a href = "https://github.com/lawalter/r-shiny-electron-app" target = "_blank">repository</a> <br>

> In this repo, I assumed using m1 mac air **only**.

------------------------------------------------------------------------

## Version Info

-   Rstudio: 2022.12.0 Build 353
-   node: v18.12.0
-   npm: v8.19.2

## Getting started on macOS {#getting-started-on-macos}

All of the following steps can be run exclusively in the RStudio terminal.

1.  Install Node.js: <https://nodejs.org/en/>

2.  Install Electron Forge using `npm` (`npm` is installed with Node.js)

-   In the Rstudio's `Terminal` (right to `console`), run `sudo npm i -g @electron-forge/cli`

3.  Check your versions of node `node -v` and npm `npm -v`.

4.  Open an existing R project, create a new one, or initialize a project by cloning a git repo.

> I recommend create new one and copy this template's content

5.  Make sure your directory is in R project folder you're ready to turn into an app.

-   Run `pwd` on the command line to check what directory you are in.

> This may `.../Github/<PROJECT>`.

-   If you're not in the right folder, change your directory using `cd example/file/path` with the example path replaced with the appropriate path to your project.

6.  In your project directory, install Electron locally by running `npx create-electron-app <APPNAME>`.

> Note: Your app cannot be titled "app".

7.  In your `<APPNAME>` folder, delete folder **`src`**.

8.  Move files (I typically use the R file pane gui) to your `<APPNAME>` folder, including:

-   `get-r-mac.sh`: for install local R into your project locally
-   `add-cran-binary-pkgs.R`: for install R packages into your project locally
-   `start-shiny.R`: let electron call your shiny app

-   Folder **shiny** from this templae, containing:
    -   `shiny/app.R`: **THIS IS YOUR SHINY APP'S CODE**

-   Folder **src** from this templae, containing:     
    -   src/failed.html     
    -   src/helpers.js     
    -   src/index.css     
    -   src/index.js     
    -   src/loading.css     
    -   src/loading.html     
    - `src/main.js`: configure shiny electron app (like `width`, `height`)

> Note: File app.R is whatever R Shiny script you want to launch in your application. You can use the example provided in this repo or use your own.

9.  Change your directory to your new app folder `cd <APPNAME>`

> This may \`.../Github/<Project>/<APPNAME>

10. Install R locally:
    -   First, check the version of R on your machine. In the R console, run `version`. 

> Your machine's installed version and newly installing version (in local) MUST same

-   Once you save the file, run the shell script in the Rstudio **terminal** `sh ./get-r-mac.sh` (for install R into your project locally)

11. If you don't have the `automagic` package installed, run `install.packages("automagic")` in the R console.

12. Add additional dependencies to package.json. Replace the dependencies listed at the end of the script with the following. Take care not to paste over the final ending bracket `}` of the .json file.

``` js
  "repository": {
    "type": "git",
    "url": "<GITHUBURL>"
  },
  "dependencies": {
    "axios": "0.27.2",
    "esm": "^3.2.25",
    "execa": "^5.1.1",
    "electron-squirrel-startup": "^1.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/plugin-transform-async-to-generator": "^7.20.7",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "eslint": "^8.35.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "fs-extra": "^11.1.0",
    "@electron-forge/cli": "^6.0.5",
    "@electron-forge/maker-deb": "^6.0.5",
    "@electron-forge/maker-rpm": "^6.0.5",
    "@electron-forge/maker-squirrel": "^6.0.5",
    "@electron-forge/maker-zip": "^6.0.5",
    "electron": "23.1.3"
  }
```

> Note: I checked every dependencies manually and it's latest version based 2023.03 (except `axios`, `axios` version 1 doesn't work yet)

## Build Shiny Electron App

> Note: You need to run this steps whenever you want to Update Electron.

13. In the Rstudio **terminal**, run `Rscript add-cran-binary-pkgs.R` to get packages for R.

> Note: Modules are updated frequently and as such are subject to changing version numbers. It is important to double-check that these dependencies are up-to-date by replacing their version numbers with any newer version numbers. You can accomplish this by manually searching the module names at <https://www.npmjs.com/>

> Note: We are using `"eslint-plugin-react-hooks": "^1.7.0"` because using the latest v2.4.0 throws a warning. Didn't checked in 2023, but still `^1.7.0` works.

14. Replace the `"lint": "echo \"No linting configured\""` line in `package.json` with `"lint": "eslint src --color"`
15. Run `npm install` to add new dependencies you listed in `package.json` to the **node_modules** folder.
16. Test to see if your app works by running `electron-forge start`
17. If the app runs successfully, congratulations! Package and create the `.exe` on the command line with `electron-forge make`. Your app can be found in the **/out** folder.

------------------------------------------------------------------------
