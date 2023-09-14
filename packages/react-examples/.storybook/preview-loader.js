import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Webpack loader that replaces the PACKAGE_NAME token in preview.js with the actual current
 * package name (or errors if the package doesn't have examples).
 *
 * @see https://webpack.js.org/api/loaders/
 * @this {import('webpack').LoaderContext<{}>}
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
