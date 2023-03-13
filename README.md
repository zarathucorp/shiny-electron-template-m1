# How to Make an R Shiny Electron App (2023, M1) 

A setup guide by L. Abigail Walter <br> 
Instructions adapted from <a href="https://www.travishinkelman.com/post/deploy-shiny-electron/">Travis Hinkelman</a> <br> 
R Shiny Electron template created by <a href="https://github.com/dirkschumacher/r-shiny-electron">Dirk Shumacher</a> <br>
Template & Instruction updated by <a href="https://github.com/jhk0530" target = "_blank">Jinhwan Kim</a> <br>

For more info, see previous <a href = "https://github.com/lawalter/r-shiny-electron-app" target = "_blank">repository</a> <br>

------------------------------------------------------------------------

## Version Info 

-   ![](https://img.shields.io/badge/R-gray?style=for-the-badge&logo=R) 4.2.2
-   ![](https://img.shields.io/badge/Shiny-gray?style=for-the-badge&logo=RStudio) 2022.12.0 Build 353
-   ![](https://img.shields.io/badge/node.js-gray?style=for-the-badge&logo=nodedotjs) v18.12.0
-   ![](https://img.shields.io/badge/npm-gray?style=for-the-badge&logo=npm) v8.19.2
-   ![](https://img.shields.io/badge/macOS-gray?style=for-the-badge&logo=apple) 13.2.1(22D68)

## Getting started

### Environment

All of the following steps can be run exclusively in the RStudio **Terminal** (right to **console**).

1.  Install **Node.js**: <a href = "https://nodejs.org/en/" target = "_blank"> Offical Page </a>

2.  Install **Electron Forge** using `npm` (`npm` is installed with `Node.js`)

-   In the **Terminal**, run `sudo npm i -g @electron-forge/cli`, (`sudo` requires password)

3.  Check your versions of `node` and `npm` in **Terminal** with `node -v`, `npm -v`.

### Project

4.  Open an existing R project, create a new one, or initialize a project by cloning a git repo.

> 💡 I recommend create new one and copy this template's content

5.  Make sure your directory is in **R project** folder (from 4.), so you're ready to turn into an app.

-   Run `pwd` on the command line to check what directory you are in. (*This may `.../Github/<PROJECT>`*)

-   If you're not in the right folder, change your directory using `cd example/file/path` with the example path replaced with the appropriate path to your project.

6.  In your project directory, install **Electron** locally by running `npx create-electron-app <APPNAME>`.

> 💡 Your app cannot be titled "app".

7.  In your **<APPNAME>** folder, delete folder **src**.

8.  Move files (I typically use the R file pane gui) to your **<APPNAME>** folder, including:

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

9. Change your directory to your new app folder `cd <APPNAME>` (*This may `.../Github/<Project>/<APPNAME>`*)

### R

10. Install R locally:
    -   First, check the version of R on your machine. In the R **Console**, run `version`. 

> 💡 Your machine's installed R version and newly installed R version (in shiny electron project) MUST same

-   Once you save the file, run the shell script in the Rstudio **terminal** with `sh ./get-r-mac.sh` (for install R into your project locally)

11. If you don't have the `automagic` package installed, run `install.packages("automagic")` in the **console**.

### Javascript

12. Add additional dependencies to `package.json`. 

- Replace the dependencies listed at the end of the script with the following. Take care not to paste over the final ending bracket `}` of the `.json` file.

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

> 💡 I checked every dependencies manually and it's latest version based 2023.03 (except `axios`, `axios` version 1 doesn't work yet)

### Shiny

13. Build `app.R` as your application's code from Example code.

## Build Shiny Electron App

> 💡 You need to run this steps **whenever** you want to update Electron.

14. In the Rstudio **terminal**, run `Rscript add-cran-binary-pkgs.R` to get packages for R.

> Note: Modules are updated frequently and as such are subject to changing version numbers. It is important to double-check that these dependencies are up-to-date by replacing their version numbers with any newer version numbers. You can accomplish this by manually searching the module names at <https://www.npmjs.com/>

> 💡 We are using `"eslint-plugin-react-hooks": "^1.7.0"` because using the latest v2.4.0 throws a warning. 
> 
> 💡 Didn't checked in 2023, but still `^1.7.0` works, so don't change it unless it requires.

15. Replace the `"lint": "echo \"No linting configured\""` line in `package.json` with `"lint": "eslint src --color"`
16. Run `npm install` to add new dependencies you listed in `package.json` to the **node_modules** folder.
17. Test to see if your app works by running `electron-forge start`
18. If the app runs successfully, congratulations! Package and create the `.exe` on the command line with `electron-forge make`. Your app can be found in the **/out** folder.

Final. Unzip the result `zip file` and run `<APPNAME>.app`

------------------------------------------------------------------------

## Trouble shooting

- Raise an issue, please.

