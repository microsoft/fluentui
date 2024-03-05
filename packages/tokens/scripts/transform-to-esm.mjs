// @ts-check

import * as fs from 'node:fs';
import * as path from 'node:path';
import { workspaceRoot, joinPathFragments } from '@nx/devkit';

main();

function main() {
  const outputLib = joinPathFragments(workspaceRoot, 'packages/tokens/lib');
  // const src = joinPathFragments(workspaceRoot, 'packages/tokens/src');
  const root = outputLib;
  console.log('start at', root);

  changeExtension(root, '.js');
}

function changeExtension(dir, extension) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    const fileExtension = path.extname(filePath);
    const isMapFile = fileExtension === '.map';

    if (stats.isDirectory()) {
      changeExtension(filePath, extension);
    } else if (fileExtension === '.js' || fileExtension === '.jsx' || isMapFile) {
      const newFilePath = isMapFile ? filePath.replace(/\.jsx?\./, '.mjs.') : filePath.slice(0, -3) + '.mjs';

      // console.log(`- Renaming ${filePath} to ${newFilePath}`);

      fs.renameSync(filePath, newFilePath);
      // const content = fs.readFileSync(newFilePath, 'utf-8');
      // const content = fs.readFileSync(filePath, 'utf-8');
      // const newContent = content.replace(/\s+'[./]+[a-z_-]+(';)$/g, '.js');
      // const modifiedContent = content.replace(/(from\s+['"])([^'"]+)(['"])/g, '$1$2.js$3');
      // fs.writeFileSync(newFilePath, newContent, 'utf-8');
      // fs.writeFileSync(filePath, modifiedContent, 'utf-8');
    }
  }
}
