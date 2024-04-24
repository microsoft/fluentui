import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), '../');

function isComponentDirectory(item) {
  const directoryItems = fs.readdirSync(path.resolve(item.path, item.name), { withFileTypes: true });
  return directoryItems
    .map(directoryItem => {
      return directoryItem.name;
    })
    .includes('define.ts');
}

export function listComponentDirectories() {
  return fs
    .readdirSync(path.resolve(__dirname, './src'), { withFileTypes: true })
    .filter(item => item.isDirectory() && isComponentDirectory(item))
    .map(directory => directory.name);
}
