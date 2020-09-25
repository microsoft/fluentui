// @ts-check
import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';

/**
 * Replace the PACKAGE_NAME token in preview.js with the actual current package name
 * (or error if the package doesn't have examples).
 * @this {webpack.loader.LoaderContext}
 * @param {string} source
 */
export default function loader(source) {
  // invalidate cache when process.cwd() changes
  this.addDependency(process.cwd());

  const packageName = path.basename(process.cwd());
  if (!fs.existsSync(path.resolve(__dirname, '../src', packageName))) {
    this.callback(new Error(`Package ${packageName} does not have examples!`));
    return;
  }

  return source.replace(/PACKAGE_NAME/g, packageName);
}
