

# Bitly App

> Simple application for shortening URLs using Bitly API. 

## Getting Started
### Install
Extract `bitly-app.zip` to any destination. Open the root directory in command line and execute this command:

  ```sh
npm install
```

### Usage
To start the application just execute this command:
```sh
npm run start
```
A message will display in the command line: `App listening on port 3000!`

Open a browser chrome/firefox and enter this url: `http://localhost:3000/`.
 
Copy any valid url and paste it in the text box `URL` and click the button `Create`.

A result will display like this `http://bit.ly/30atsq6` if the request is successful otherwise an error message will display such as `INVALID_URI`. You can hightlight and copy or click button `copy` to copy the result link and test it. You can test more URL.

### Unit Testing

In your command line, execute this code:
 ```sh
npm run test
```
Example output of unit testing:
 ```
PASS  local_modules/logger/logger.test.js
PASS  local_modules/bitlyClient/bitlyClient.test.js
PASS  ./app.test.js

Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.539s
Ran all test suites.
```

## About
### Logs

Every successful requests or conversions with bitly API are being log by the application in `/temp` directory with the log format:
 ```
 <timestamp> - <longURL> <shortURL>
```

## Development
To start the development just execute this command:
 ```
npm run dev
```
### Local Modules
- biltyClient - a bitly client API that I developed to communicate with bitly REST API
- logger - a simple application logging library intended for keeping a copy of successful request with bitly

### Dependencies
- body-parser : Parse incoming request bodies
- bootstrap: Use in GUI of the application
- clipboard: Copy the text in the clipboard using a button
- dateformat: Helper for date formatting
- express: Http Server
- jquery: Use for DOM manipulation
- request: Make http calls with NodeJS

### Development Dependencies
- @babel/plugin-transform-modules-commonjs : transform es6 import/export to to commonjs
- babel-cli : JavaScript compiler that convert es6 to backwards compatible version of JavaScript 
- babel-preset-es2015 : babel present of es2015
- jest : used for unit testing
- nodemon : allows to restart the server if there is changes in the codes
- valid-url : used to validate URL
- supertest : used for HTTP assertions
