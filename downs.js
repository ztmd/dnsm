'use strict';

const fs = require('fs');
const path = require('path');

const {
  getHTML,
  wFile
} = require('./helpers');

function dnsm(options) {
  const {
    dist, url, indexPath, jsPath, cssPath, js, css
  } = {...dnsm.defaults, ...options};

  if (!url) {
    throw new Error('url is required');
  }

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, {recursive: true});
  }

  fetchHTML(url, path.join(dist, indexPath), data => {
    if (js) {
      parseScript(data, url + jsPath, dist);
    }

    if (css) {
      downCss(data, url + cssPath, dist);
    }
  });
}

dnsm.defaults = {
  dist: 'dist',
  url: '',
  indexPath: 'index.html',
  jsPath: 'static/js/',
  cssPath: 'static/css/',
  js: true,
  css: false
};

function fetchHTML(src, dest, callback) {
  getHTML(src).then(data => {
    if (data === undefined) {
      return console.log(`Failed to load content from \`${src}\``);
    }
    wFile(dest, data);

    if (typeof callback === 'function') {
      callback(data, src, dest);
    }
  });
}

function downCss(content, cssBase, distFolder) {
  content.replace(/<link[^>]href=['"]?([^hf][^'"]+?\.css)[^>]*\/?\s*>/g, (all, href) => {
    const match = href.match(/([^/]+\.css)/);
    const name = match && match[1];
    if (name) {
      fetchHTML(cssBase + name, path.join(distFolder, 'css', name));
      fetchHTML(cssBase + name + '.map', path.join(distFolder, 'css', name + '.map'));
    }
  });
}

function parseScript(content, jsBase, distFolder) {
  content.replace(/<script[^>]*src\s*=['"]?([^hf][^'"]+?\.js)[^>]*><\/script>/g, (all, src) => {
    const name = src.match(/([^/]+\.js)/)[1];
    if (name) {
      fetchHTML(jsBase + name, path.join(distFolder, 'js', name), data => {
        fetchChunk(data, jsBase, distFolder);
      });

      fetchHTML(jsBase + name + '.map', path.join(distFolder, 'js', name + '.map'));
    }
  });
}

function fetchChunk(content, jsBase, distFolder) {
  const match = content.match(/(\{[^}]+\})\[[^]+\]\s*\+\s*['"]\.js/);
  const result = match && match[1];

  if (!result) {
    return;
  }

  const names = result.match(/(\d+):\s*['"]([^'"]+)['"]/g);

  const files = names.map(item => item.replace(':"', '.').replace('"', '') + '.js');
  const filemaps = files.map(item => item + '.map');

  files.forEach(item => fetchHTML(jsBase + item, path.join(distFolder, 'js', item)));
  filemaps.forEach(item => fetchHTML(jsBase + item, path.join(distFolder, 'js', item)));
}

module.exports = dnsm;
