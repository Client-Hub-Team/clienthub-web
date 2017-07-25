# Alana.AI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.4.

## Installation

Run `npm install` to install dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Creating new Components

Go to `/src/app` and create a new folder with your Component name. A new component must have a `.ts` and `.html` file, and the common pattern is `name.component.ts/html`.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Building the Electron App

Go to `web/electron_app` and run `npm install`. After it's done, run `npm run dist` and it should be created in a minute or so.
Settings for the Electron build can be found in `package.json`. Electron code can be changed in `electron.js`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
