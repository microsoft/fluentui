import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = path.join(import.meta.dirname, '..');
const tensileConfig = 'tensile.config.js';

try {
  const esmOutput = path.join(rootDir, 'dist', 'esm');
  const items = await fs.readdir(esmOutput);

  // Collect all component folders
  const folders = [];
  for (const item of items) {
    const itemPath = path.join(esmOutput, item);
    const stats = await fs.lstat(itemPath);
    if (stats.isDirectory()) {
      folders.push(item);
    }
  }

  // Collect all .bench.js files
  const benchFiles = [];
  for (const folder of folders) {
    const folderPath = path.join(esmOutput, folder);
    const files = await fs.readdir(folderPath);
    const filteredFiles = files.filter(file => file.endsWith('.bench.js'));
    benchFiles.push(...filteredFiles.map(file => path.relative(rootDir, path.join(folderPath, file))));
  }

  // Execute tensile for each .bench.js file
  for (const file of benchFiles) {
    try {
      // eslint-disable-next-line no-undef
      execSync(`tensile --file ./${file} --config ${tensileConfig} ${process.argv[2]}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error executing command for file ${file}: ${error.message}`);
    }
  }
} catch (error) {
  console.error(`Error reading directory: ${error.message}`);
}
