#!/usr/bin/env node
"use strict";

const http = require("http");
const fs = require("fs");
const path = require('path');
const pipe = require("./helpers/pipe");
const color = require("./helpers/getColor");
const meme = require("./helpers/getMimeType");

/**
 * 
 * @param {function} callback 
 * @param {number} port 
 */
const createServer = (port) => http
  .createServer(getStream)
  .on("error", (err) => console.log(color("red"), `Error! ${err}`))
  .on("listening", () => {
    console.log(`Listening on ${port}`);
    console.log(`Click to open to link http://localhost:${port}`)
  });

/**
 * 
 * @param request, 
 * @param responce
 */
const getStream = (req, res) => pipe(
  (req, res) => process.cwd() + req.url,
  file => fs.existsSync(file) && fs.lstatSync(file).isDirectory()
    ? path.join(file + `index.html`) 
    : file,
  x => { console.log(`Read file: ${x}`); return x;},
  file => ({
    stream: fs.createReadStream(file),
    memeType: meme(file)
  }),
  ({stream, memeType}) => {
    stream.on('open', () => {
      res.writeHead(200, {'Content-Type': memeType});
      stream.pipe(res);
    })
    stream.on('error', (err) => {
      res.end(err.toString());
    })
  }
)(req, res)

/**
 * 
 * @param {string} filename 
 */

const showHelp = () => void console.log(`
Usage: merely-server [options]

Options: 

--port  set port for server. Default value: 8080. Example: --port 3000.
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
    if (isNaN(port)) {
      console.error(color("red"), "Port must be a Number. For more information use --help");
      process.exit(1);
    }
    return port || 3000;
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

void function () {
  let argv = process.argv.slice(2);

  getHelp(argv);

  let port = getPort(argv);

  createServer(port).listen(port)
}()
