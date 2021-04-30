import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Replace the PACKAGE_NAME token in preview.js with the actual current package name
 * (or error if the package doesn't have examples).
 *
 * Also if this is the storybook for `@fluentui/react` or `@fluentui/react-components`, replace the
 * REACT_DEPS token with the actual list of dependencies which have their own examples but should be
 * included in the suite package storybook.
 * @this {{addDependency: (file: string)=>void;callback: ((err: Error | null)=>void)}} loader context - https://webpack.js.org/api/loaders/#the-loader-context
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

  if (packageName === 'react' || packageName === 'react-components') {
    // Compare the list of direct deps of suite packages with the list of packages with examples
    // to see which extra packages' examples should be used  (note: all names here are unscoped).
    const packagesWithExamples = fs.readdirSync(path.resolve(__dirname, '../src')).filter(p => !/\.tsx?$/.test(p));
    const reactPackageJson = fs.readJSONSync(path.resolve(__dirname, `../../${packageName}/package.json`));
    // get unscoped dep names
    const reactDeps = Object.keys(reactPackageJson.dependencies).map(d => d.split('/')[1] || d);
    const reactDepsWithExamples = packagesWithExamples.filter(p => reactDeps.includes(p));

    // @TODO
    // - this is a temporary solution until all converged packages use new storybook configuration
    // - after new config is in place remove this whole IF
    //
    // NOTE:
    // - if we run storybook for react-components we wanna include all possible package collocated stories
    // based on react-components package.json
    if (packageName === 'react-components') {
      const _convergedDependencies = reactDeps.filter(dependencyName => {
        return dependencyName.startsWith('react-');
      });

      reactDepsWithExamples.push(..._convergedDependencies);
    }

    source = source.replace(/REACT_DEPS/g, [...new Set(reactDepsWithExamples)].join('|'));
  }

  return source;
}
