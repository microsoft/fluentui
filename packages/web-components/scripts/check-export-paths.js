import packageJson from '../package.json' assert { type: 'json' };
import { listComponentDirectories } from './utilities.js';

const packageJsonExports = packageJson.exports;

listComponentDirectories().forEach(componentDirectory => {
  if (packageJsonExports[`./${componentDirectory}.js`] === undefined) {
    throw new Error(`The component ${componentDirectory} is missing as a named export in package.json.`);
  }
});
