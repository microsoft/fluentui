// @ts-check
import * as fs from 'fs-extra';
import * as path from 'path';
import * as webpack from 'webpack';

/**
 * Replace the PACKAGE_NAME token in preview.js with the actual current package name
 * (or error if the package doesn't have examples).
 *
 * Also if this is the storybook for `@fluentui/react`, replace the REACT_DEPS token
 * with the actual list of dependencies of `@fluentui/react` which have their own examples
 * but should be included in the suite package storybook.
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

  source = source.replace(/PACKAGE_NAME/g, packageName);

  if (packageName === 'react') {
    // Compare the list of direct deps of @fluentui/react with the list of packages with examples
    // to see which extra packages' examples should be used  (note: all names here are unscoped).
    const packagesWithExamples = fs.readdirSync(path.resolve(__dirname, '../src')).filter(p => !/\.tsx?$/.test(p));
    const reactPackageJson = fs.readJSONSync(path.resolve(__dirname, '../../react/package.json'));
    // get unscoped dep names
    const reactDeps = Object.keys(reactPackageJson.dependencies).map(d => d.split('/')[1] || d);
    const reactDepsWithExamples = [
      ...packagesWithExamples.filter(p => reactDeps.includes(p)),
      // Lower-level component packages re-exported by react-internal
      'react-focus',
    ];
    source = source.replace(/REACT_DEPS/g, reactDepsWithExamples.join('|'));
  }

  return source;
}
