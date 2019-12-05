# UI Tests for the Eurofurence Hotelbooking App

Implemented using [testcafe](https://github.com/DevExpress/testcafe) in JavaScript (ECMAScript6 to be precise).

## Installation

### Command Line 

All you need besides a clone of this repository is testcafe. Once [node.js](https://nodejs.org/en/download/) 
(and thus npm) is installed and in your path, run

```
npm install -g testcafe
```

### JetBrains WebStorm

Alternatively, this repository includes a package.json, so opening the project in WebStorm should download its dependencies to
`node_modules`. In particular, it will download a version of testcafe to `node_modules/testcafe`

## Running the Tests

### Command Line 

You should simply be able to run a command like ```testcafe firefox src/main.js``` while inside this project.

### JetBrains WebStorm

Configure a node.js runtime configuration with 

<table>
  <tr><td>Node Interpreter:</td><td>(Project node, or some other node installation with a current version)</td></tr>
  <tr><td>Node Parameters:</td><td></td></tr>
  <tr><td>Working Directory:</td><td>(project directory root)</td></tr>
  <tr><td>JavaScript file:</td><td>node_modules/testcafe/bin/testcafe.js</td></tr>
  <tr><td>Application parameters:</td><td>firefox src/main.js</td></tr>
</table>

## Test Cases To Be Automated

### Landing Page

 - L1: main URL shows landing page with long countdown if invoked at a time that is more than an hour away from go live
 - L2: main URL shows landing page with short countdown if invoked at a time that is less than an hour away from go live
 - L3: main URL shows landing page after go-live
 - L4: can navigate to form page before go-live
 - L5: can navigate to form after go-live

### Form Page

 - F1: can fill in a valid registration with no validation errors
 - F2: validation flags all invalid data as expected
 - F3: can move on to submit page with valid data

### Submit Page



## Manual Test Cases / Code Verification

 - Watch log of backend for extra requests / errors
 - Try the app on various mobile devices and with various desktop browsers
 - Manually test date picker validation for birthday (too much work to automate and it's a standard component)
