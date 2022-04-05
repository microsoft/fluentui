import * as path from 'path';
import { sassTask } from 'just-scripts';
import postcssModules from 'postcss-modules';
import CleanCSS from 'clean-css';

const _fileNameToClassMap = {};

function createTypeScriptModule(fileName, css) {
  const { splitStyles } = require('@microsoft/load-themed-styles');
  // Create a source file.
  const minifiedCSS = new CleanCSS().minify(css).styles;
  const source = [
    `/* eslint-disable */`,
    `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
    `loadStyles(${JSON.stringify(splitStyles(minifiedCSS))});`,
  ];

  const map = _fileNameToClassMap[fileName];

  for (let prop in map) {
    source.push(`export const ${prop} = "${map[prop]}";`);
  }

  return source.join('\n');
}

function generateScopedName(name, fileName, css) {
  const crypto = require('crypto');

  return name + '_' + crypto.createHmac('sha1', fileName).update(css).digest('hex').substring(0, 8);
}

function getJSON(cssFileName, json) {
  _fileNameToClassMap[path.resolve(cssFileName)] = json;
}

export const sass = sassTask({
  createSourceModule: createTypeScriptModule,
  postcssPlugins: [
    postcssModules({
      getJSON,
      generateScopedName,
    }),
  ],
});
