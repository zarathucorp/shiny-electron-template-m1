# How to Make an R Shiny Electron App (2023, M1) 

A setup guide by L. Abigail Walter <br> 
Instructions adapted from <a href="https://www.travishinkelman.com/post/deploy-shiny-electron/">Travis Hinkelman</a> <br> 
R Shiny Electron template created by <a href="https://github.com/dirkschumacher/r-shiny-electron">Dirk Shumacher</a> <br>
Template & Instruction updated by <a href="https://github.com/jhk0530" target = "_blank">Jinhwan Kim</a> <br>

For windows, see [this repository](https://github.com/zarathucorp/shiny-electron-template-windows-2023)

For more info, see previous <a href = "https://github.com/lawalter/r-shiny-electron-app" target = "_blank">repository</a> <br>

## Guide article in R-bloggers (based on 2023.03)

<a href='https://www.r-bloggers.com/2023/03/creating-standalone-apps-from-shiny-with-electron-2023-macos-m1/' target ='_blank'>Creating Standalone Apps from Shiny with Electron [2023, macOS M1]</a>

------------------------------------------------------------------------

## Version Info 

-   ![](https://img.shields.io/badge/R-gray?style=for-the-badge&logo=R) 4.3.1
-   ![](https://img.shields.io/badge/Shiny-gray?style=for-the-badge&logo=RStudio) 2023.06.1 Build 524
-   ![](https://img.shields.io/badge/node.js-gray?style=for-the-badge&logo=nodedotjs) v18.15.0
-   ![](https://img.shields.io/badge/npm-gray?style=for-the-badge&logo=npm) v9.8.1
-   ![](https://img.shields.io/badge/macOS-gray?style=for-the-badge&logo=apple) 13.4.1 (c)

## Getting started

### Environment

All of the following steps can be run exclusively in the RStudio **Terminal** (right to **console**).

0. Install R, Rstudio.

1.  Install **Node.js**: <a href = "https://nodejs.org/en/" target = "_blank"> Offical Page </a>

2.  Install **Electron Forge** using `npm` (`npm` is installed with `Node.js`)

-   In the **Terminal**, run `sudo npm i -g @electron-forge/cli`, (`sudo` requires password)

3.  Check your versions of `node` and `npm` in **Terminal** with `node -v`, `npm -v`.

4. Fork this repository and clone it to your local PC

### Project

5.  Open an existing R project, create a new one, or initialize a project by cloning a git repo.

> 💡 I recommend open cloned `.Rproj` file

6.  Make sure your directory is in **R project** folder (from 4.), so you're ready to turn into an app.

-   Run `pwd` on the command line to check what directory you are in. (*This may `.../Github/<PROJECT>`*)

-   If you're not in the right folder, change your directory using `cd example/file/path` with the example path replaced with the appropriate path to your project.

7.  In your project directory, install **Electron** locally by running `npx create-electron-app <APPNAME>`.

> 💡 Your app cannot be titled "app".

8.  In your `<APPNAME>` folder, delete folder **src**.

9.  Move files (I typically use the R file pane gui) to your `<APPNAME>` folder, including:

-   `get-r-mac.sh`: for install local R into your project locally
-   `add-cran-binary-pkgs.R`: for install R packages into your project locally
-   `start-shiny.R`: let electron call your shiny app

-   Folder **shiny** from this template, containing:
    -   `shiny/app.R`: **THIS IS YOUR SHINY APP'S CODE**
    -   other required file (like `/www`)

-   Folder **src** from this template, containing:     
    -   src/failed.html     
    -   src/helpers.js     
    -   src/index.css     
    -   src/index.js     
    -   src/loading.css     
    -   src/loading.html     
    - `src/main.js`: configure shiny electron app (like `width`, `height`)

10. Change your directory to your new app folder `cd <APPNAME>` (*This may `.../Github/<Project>/<APPNAME>`*)

### R

11. Install R locally:
    -   First, check the version of R on your machine. In the R **Console**, run `version`. 

> 💡 Your machine's installed R version and newly installed R version (in shiny electron project) MUST same

-   Once you save the file, run the shell script in the Rstudio **terminal** with `sh ./get-r-mac.sh` (for install R into your project locally)

12. If you don't have the `automagic` package installed, run `install.packages("automagic")` in the **console**.

### Javascript

13. Add additional dependencies to `package.json`. 

- Replace the dependencies (After **Author**) listed at the end of the script with the following. Take care not to paste over the final ending bracket `}` of the `.json` file.

``` js
  "repository": {
    "type": "git",
    "url": "<GITHUBURL>"
  },
    "dependencies": {
    "axios": "0.27.2",
    "electron-squirrel-startup": "^1.0.0",
    "esm": "^3.2.25",
    "execa": "^5.1.1"
  },
  "devDependencies": {
    "@babel/core": "^7.22.11",
    "@babel/plugin-transform-async-to-generator": "^7.22.5",
    "@babel/preset-env": "^7.22.10",
    "@babel/preset-react": "^7.22.5",
    "@electron-forge/cli": "^6.4.1",
    "@electron-forge/maker-dmg": "^6.4.1",
    "@electron-forge/maker-zip": "^6.4.1",
    "@electron-forge/plugin-auto-unpack-natives": "^6.4.1",
    "electron": "^26.1.0",
    "fs-extra": "^11.1.0"
```

> 💡 This work with 2023.08, do not update dependencies (axios & esm & execa)

### Shiny

14. Build `app.R` as your application's code from Example code.

## Build Shiny Electron App

> 💡 You need to run this steps **whenever** you want to update shiny application. 

15. In the Rstudio **terminal**, run `Rscript add-cran-binary-pkgs.R` to get packages for R.

> Note: Modules are updated frequently and as such are subject to changing version numbers. It is important to double-check that these dependencies are up-to-date by replacing their version numbers with any newer version numbers. You can accomplish this by manually searching the module names at <https://www.npmjs.com/>

16. Run `npm install` to add new dependencies you listed in `package.json` to the **node_modules** folder.
17. Test to see if your app works by running `electron-forge start`

> 💡 If application keep running (not start), Try restart R with `CMD + Shift + 0` / **Session -> Restart R** in Rstudio. then retry 17.

18. If the app runs successfully, congratulations! Package and create the `.exe` on the command line with `electron-forge make`. Your app can be found in the **/out** folder.

Final. Unzip the result `zip file` and run `<APPNAME>.app` 

------------------------------------------------------------------------

## Trouble shooting

- Raise an issue, please.

#### Error with require() of ES Module

- Change `dependencies` (see [issue](/../../issues/2))

```
"dependencies": {
    "axios": "^0.27.2",
    "esm": "^3.2.25"
    ...
}
```

#### Add not-CRAN packages

- manually copy library from your Local's R library to **r-mac/library**, you can check with `.libPaths()` in R console.

#### electron-forge start work, but electron-forge make not work

- It seems to be problem caused by permission, **run .app file via terminal** with `sudo open ~~.app`.
