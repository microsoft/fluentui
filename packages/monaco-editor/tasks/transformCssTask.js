// @ts-check
const fs = require('fs');
const glob = require('glob');

function createEsm(css) {
  const { splitStyles } = require('@microsoft/load-themed-styles');

  // Create a source file.
  const source = [
    `/* tslint:disable */`,
    `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
    `loadStyles(${JSON.stringify(splitStyles(css))});`
  ];

  return source.join('\n');
}

exports.transformCssTask = function() {
  const cssFiles = glob.sync('esm/**/*.css');
  for (let cssFile of cssFiles) {
    fs.writeFileSync(`${cssFile}.js`, createEsm(fs.readFileSync(cssFile, 'utf-8')));
    fs.unlinkSync(cssFile);
  }
};
