// @ts-check

const path = require('path');
const { sassTask } = require('just-scripts');
const postcssModules = require('postcss-modules');

const modules = postcssModules({
  getJSON,
  generateScopedName
});
const _fileNameToClassMap = {};

function createTypeScriptModule(fileName, css) {
  const { splitStyles } = require('@microsoft/load-themed-styles');

  // Create a source file.
  const source = [
    `/* tslint:disable */`,
    `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
    `loadStyles(${JSON.stringify(splitStyles(css))});`
  ];

  const map = _fileNameToClassMap[fileName];

  for (let prop in map) {
    source.push(`export const ${prop} = "${map[prop]}";`);
  }

  return source.join('\n');
}

function generateScopedName(name, fileName, css) {
  const crypto = require('crypto');

  return (
    name +
    '_' +
    crypto
      .createHmac('sha1', fileName)
      .update(css)
      .digest('hex')
      .substring(0, 8)
  );
}

function getJSON(cssFileName, json) {
  _fileNameToClassMap[path.resolve(cssFileName)] = json;
}

exports.sass = sassTask(createTypeScriptModule, [modules]);
