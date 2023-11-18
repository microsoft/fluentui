import * as fs from 'fs';
import glob from 'glob';
import { splitStyles } from '@microsoft/load-themed-styles';

function createEsm(css: string) {
  // Create a source file.
  const source = [
    `/* eslint-disable */`,
    `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
    `loadStyles(${JSON.stringify(splitStyles(css))});`,
  ];

  return source.join('\n');
}

export function transformCssTask() {
  const cssFiles = glob.sync('esm/**/*.css');
  for (const cssFile of cssFiles) {
    fs.writeFileSync(`${cssFile}.js`, createEsm(fs.readFileSync(cssFile, 'utf-8')));
    fs.unlinkSync(cssFile);
  }
}
