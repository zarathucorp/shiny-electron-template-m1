# shiny-electron-template-m1

## How to Make an R Shiny Electron App

> [!NOTE] 
>
> A setup guide by L. Abigail Walter <br>
> Instructions adapted from <a href="https://www.travishinkelman.com/post/deploy-shiny-electron/">Travis Hinkelman</a> <br>
> R Shiny Electron template created by <a href="https://github.com/dirkschumacher/r-shiny-electron">Dirk Shumacher</a> <br>
> Template & Instruction updated by <a href="https://github.com/jhk0530" target = "_blank">Jinhwan Kim</a> <br>
> 
> For more info, see previous <a href = "https://github.com/lawalter/r-shiny-electron-app" target = "_blank">repository</a> <br>

> [!TIP]
> For Windows, see <a href ='https://github.com/zarathucorp/shiny-electron-template-windows' target = "_blank">this repository</a>

## Guide article in R-bloggers (based on 2023.03, may not work in 2024-)

<a href='https://www.r-bloggers.com/2023/03/creating-standalone-apps-from-shiny-with-electron-2023-macos-m1/' target ='_blank'>Creating Standalone Apps from Shiny with Electron [2023, macOS M1]</a>

## Versions info 
![NodeJS](https://img.shields.io/badge/node.js-18.18.0-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-10.3.0-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![RStudio](https://img.shields.io/badge/RStudio-2023.12.0-4285F4?style=for-the-badge&logo=rstudio&logoColor=white)
![R](https://img.shields.io/badge/r-4.3.2-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white)
![Electron.js](https://img.shields.io/badge/Electron-7.2.0-191970?style=for-the-badge&logo=Electron&logoColor=white) 
![macOS](https://img.shields.io/badge/macOS-14.2.1-FFFFFF?style=for-the-badge&logo=apple)

---

## Getting started

### A. Environment setup

> [!NOTE]
> All of the following steps can be run exclusively in the RStudio **Terminal** (right to **console**).
>
> so **Terminal** means Rstudio's terminal using <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>m</kbd>

1. Install **R**, **Rstudio**.
2. Install **Node.js**: from <a href = "https://nodejs.org/en/" target = "_blank"> offical page </a>
3. Install **Electron Forge** using `npm` (`npm` is installed with `Node.js`)
4. In the **Terminal**, run `sudo npm i -g @electron-forge/cli`, (`sudo` requires password)

> [!NOTE]
> Check your versions of `node` and `npm` in **Terminal** with `node -v`, `npm -v`.

5. Give **Star** ⭐, **Fork** this repository to your own account. Then **clone** it to your local PC

### B. Elecron project

6.  Open an R project with cloned repository's `.Rproj` file.
7.  In your project directory (may `Github/shiny-electron-template-m1`), install **Electron** locally by running `npx create-electron-app <APPNAME>`.

> [!WARNING]
> You can not use `app` as `<APPNAME>` <br>
> Assume using `myapp` in this tutorial

8.  In your `myapp` folder, **delete** `src` directory
9.  Copy (or move) below files to your `myapp` folder:

-   `get-r-mac.sh`: For install local R for electron app.
-   `add-cran-binary-pkgs.R`: For install R packages into your project locally
-   `start-shiny.R`: Let electron call your shiny app

-   Folder **shiny** from this template, containing:
    -  `shiny/app.R`: **THIS IS YOUR SHINY APP'S CODE**    

-   Folder **src** from this template, containing:         
    -   src/helpers.js     
    -   src/index.css     
    -   src/index.js     
    -   src/loading.css     
    -   src/loading.html     
    - `src/main.js`: configure shiny electron app (like `width`, `height`)

10. Change your directory to new app folder `cd myapp` with **Terminal**

### C. Setup R 

11. Install local R with `sh ./get-r-mac.sh`
    -   First, check the version of R on your machine. In the R **Console**, run `version`.

> [!WARNING]
> **Your PC's R version** and **electron's R version** must same

12. Build `app.R` as your application's code.

> [!NOTE]
> not only `app.R` also other required files for shiny application (like `/www`)

13. If you don't have the `automagic` package installed, run `install.packages("automagic")` in the **console**.

14. In the Rstudio **terminal**, run `Rscript add-cran-binary-pkgs.R` to get packages for R.

> [!NOTE]
> If your shiny application uses not-CRAN packages (like `github` / `bioconductor`), See **Add not-CRAN packages** below.
> 

### D. Setup electron

15. Change `package.json` as <a target = "_blank" href='%5Bfix%5D%20package-json'>`[fix] packages-json`</a>'s content. And modify **author** information.

> [!NOTE]
> Node package's version confirmed in 2024.01

16. Change `forge.config.js` as <a target = "_blank" href = '/%5Bfix%5D%20forge.config.js'>`[fix] forge.config.js`</a>'s content. 

17. Run `sudo npm install` in **Terminal** to add new dependencies you listed in `package.json` to the **node_modules** folder.

### E. Build shiny.exe

> [!NOTE]
> You need to run step after this, **whenever** you want to update shiny application.

18. Test your shiny application work by `electron-forge start` in **Terminal**.

19. If error occurs while `electron-forge make` with `conf.d` Delete `r-mac/fontconfig/fonts/conf.d`. see this [issue](https://github.com/zarathucorp/shiny-electron-template-m1/issues/5)

20. If the app runs successfully, congratulations! Create the `.exe`(as ZIP) on the `electron-forge make` in **Terminal**. Your app can be found in the **/out** folder. (Strongly recommend to **change read-only property** with mac's `Finder`)

------------------------------------------------------------------------

## Additionals

- Raise an issue, please.

### Error with require() of ES Module

It doesn't affect to run shiny.

### Add not-CRAN packages

- manually copy library from your **Local's R library** to **r-mac/library**, You can check Local's R library with `.libPaths()` in **R console**.

### Infinite loading in Electron-forge start / make

- First, change app.R code as basic [example](https://github.com/rstudio/shiny/blob/main/inst/examples/01_hello/app.R).
- If this works well, your app.R code has problem. In my case, I updated R package in shiny application but not in library of R-win directory. 
- So update them with recent version, and try again will work.  
