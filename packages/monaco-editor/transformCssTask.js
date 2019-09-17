// @ts-check
const fs = require('fs');
const glob = require('glob');
const _fileNameToClassMap = {};

function createEsm(fileName, css) {
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

exports.transformCssTask = function() {
  const cssFiles = glob.sync('lib/**/*.css');
  for (let cssFile of cssFiles) {
    fs.writeFileSync(`${cssFile}.js`, createEsm(cssFile, fs.readFileSync(cssFile, 'utf-8')));
    fs.unlinkSync(cssFile);
  }
};
