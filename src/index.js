#!/usr/bin/env node
"use strict";

const http = require("http");
const fs = require("fs");
const pipe = require("./helpers/pipe");
const color = require("./helpers/getColor");

/**
 * 
 * @param {function} callback 
 * @param {number} port 
 */
const createServer = (callback) => (port) => http
    .createServer(callback)
    .on("error", (err) => console.log(color("red"), `Error! ${err}`))
    .on("listening", () => {
        console.log(`Listening on ${port}`);
        console.log(`Click to open to link http://localhost:${port}`)
    });

/**
 * 
 * @param {http responce} response 
 */
const getStream = response => filename => fs
    .createReadStream(filename)
    .on("error", () => {
        console.log(color("red"), "Error! Can't read file 'index.html'. Check, that file is exists & correct.");
        response.end();
    });

/**
 * 
 * @param {string} filename 
 */
const serverCallback = (filename) => (request, response) => getStream(response)(filename).pipe(response);

const showHelp = () => void console.log(`
Usage: merely-server [options]

Options: 

--port  set port for server. Default value: 8080. Example: --port 3000.
--file  set file name for start page. Default value: index.html. Example: --file start.html
--help, -h  output usage information
`);

/**
 * 
 * @param {process.argv} agrv 
 */
const getPort = pipe(
    agrv => agrv.findIndex(x => x === "--port"),
    index => index === -1 ? null : Number(agrv[index + 1]),
    port => {
        if (isNaN(port)){
            console.error(color("red"), "Port must be a Number. For more information use --help");
            process.exit(1);
        }
        return port || 3000;
    }
);

/**
 * 
 * @param {process.argv} agrv 
 */
const getFile = pipe(
    argv => argv.findIndex(x => x === "--file"),
    index => index === -1 ? null : argv[index + 1],
    filename => {
        if (filename != null && !new RegExp(/\.html/g).test(filename)) {
            console.error(color("red"), "Needs `html` file. For more information use --help.");
            process.exit(1);
        }
        return filename || "index.html"
    }
);

const getHelp = pipe(
    argv => argv.findIndex(x => x === "--help" || x === "-h"),
    index => {
        if (index === -1) { return; }
        showHelp();
        process.exit(0);
    }
);

void function() {
    let argv = process.argv.slice(2);

    getHelp(argv);

    let port = getPort(argv);

    let server = pipe(
        getFile,
        serverCallback,
        createServer,
    )(argv)
      
    server(port).listen(port)
}()
