'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

function getHTML(url) {

  return new Promise(function (resolve, reject) {
    (/^https/i.test(url) ? https : http).get(url, function (res) {
      var html = '';

      res.on('data', function (chunk) {
        // chunk is a Buffer instance, use the method toString to get the string
        html += chunk;
      });

      res.on('end', function () {
        if (res.statusCode === 404) {
          resolve();
        } else {
          resolve(html);
        }
      });
    }).on('error', function () {
      resolve();
    });
  });
}

function wFile(filePath, content, cb) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.log(`${filePath} write failed, ${err}`);
    } else {
      console.log(`${filePath} write success`);
      if (cb) {
        cb();
      }
    }
  });
}

module.exports = {
  getHTML,
  wFile
};
