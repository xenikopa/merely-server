#!/usr/bin/env node
"use strict";
const pipe = require("./pipe");

const types = new Map([
  [".css", "text/css"],
  [".csv", "text/csv"],
  [".doc", "application/msword"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  [".eot", "application/vnd.ms-fontobject"],
  [".gz", "application/gzip"],
  [".gif", "image/gif"],
  [".htm", "text/html"],
  [".html", "text/html"],
  [".ico", "image/vnd.microsoft.icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript"],
  [".json", "application/json"],
  [".mjs", "text/javascript"],
  [".mp3", "audio/mpeg"],
  [".mpeg", "video/mpeg"],
  [".otf", "font/otf"],
  [".png", "image/png"],
  [".pdf", "application/pdf"],
  [".svg", "image/svg+xml"],
  [".tif", "image/tiff"],
  [".ttf", "font/ttf"],
  [".txt", "text/plain"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xls", "application/vnd.ms-excel"],
  [".xml", "text/xml"],
  [".zip", "application/zip"],
])

module.exports = (path) => pipe(
  path => `.${path.split(/\#|\?/)[0].split('.').pop().trim()}`,
  extention => types.has(extention) ? types.get(extention) : "text/plain",
)(path)