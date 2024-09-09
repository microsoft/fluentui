import * as path from 'path';

import { sassTask } from 'just-scripts';
import postcssModules from 'postcss-modules';

const _fileNameToClassMap: Record<string, Record<string, string>> = {};

function createTypeScriptModule(fileName: string, css: string) {
  const { splitStyles } = require('@microsoft/load-themed-styles');
  const CleanCSS = require('clean-css');

  // Create a source file.
  const minifiedCSS = new CleanCSS().minify(css).styles;
  const source = [
    `/* eslint-disable */`,
    `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
    `loadStyles(${JSON.stringify(splitStyles(minifiedCSS))});`,
  ];

  const map = _fileNameToClassMap[fileName];

  // eslint-disable-next-line guard-for-in
  for (const prop in map) {
    source.push(`export const ${prop} = "${map[prop]}";`);
  }

  return source.join('\n');
}

function generateScopedName(name: string, fileName: string, css: string) {
  const crypto = require('crypto');

  return name + '_' + crypto.createHmac('sha1', fileName).update(css).digest('hex').substring(0, 8);
}

function getJSON(cssFileName: string, json: Record<string, string>) {
  _fileNameToClassMap[path.resolve(cssFileName)] = json;
}

export function sass(enable: boolean) {
  // small optimization: if there are no sass files, the task does nothing
  // (skip actually calling sassTask which must parse several extra dependencies)
  if (!enable) {
    return () => undefined;
  }

  return sassTask({
    createSourceModule: createTypeScriptModule,
    postcssPlugins: [
      postcssModules({
        getJSON,
        generateScopedName,
      }),
    ],
  });
}
