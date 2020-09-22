// @ts-check
const path = require('path');

const { findRepoDeps, findGitRoot } = require('../monorepo/index');
const { readConfig } = require('../read-config');

function getOutputPath(entryPoint) {
  return entryPoint && entryPoint.includes('dist/es') ? 'dist/es' : 'lib';
}

/**
 * @param {boolean} [useLib] whether to use `lib` instead of `src` for other packages
 */
function getResolveAlias(useLib) {
  const cwd = process.cwd();
  const gitRoot = findGitRoot();
  const deps = findRepoDeps(cwd);

  /** @type {{ [key: string]: string }} */
  const alias = {};
  const excludedPackages = [
    '@fluentui/eslint-rules',
    '@fluentui/storybook',
    '@uifabric/api-docs',
    '@uifabric/build',
    '@uifabric/webpack-utils',
    '@uifabric/jest-serializer-merge-styles',
  ];

  const packageJson = readConfig(path.join(cwd, 'package.json'));

  deps.forEach(({ packageJson: depPackageJson, packagePath: depPackagePath }) => {
    const depName = depPackageJson.name;
    const entryPoint = depPackageJson.module || depPackageJson.main;

    if (excludedPackages.includes(depName)) {
      return;
    }

    if (!entryPoint) {
      // Something really weird--still give the path to its repo location
      alias[depName] = path.join(gitRoot, depPackagePath);
    } else if (/\b(dist|lib)\b/.test(entryPoint)) {
      // Standard package
      alias[`${depName}/src`] = path.join(gitRoot, depPackagePath, 'src');

      if (!useLib) {
        const outputPath = getOutputPath(entryPoint);

        alias[`${depName}/${outputPath}`] = path.join(gitRoot, depPackagePath, 'src');

        if (/\/index\b/.test(entryPoint)) {
          // Standard index entry point
          alias[`${depName}$`] = path.join(gitRoot, depPackagePath, 'src');
        } else {
          // Non-standard entry point name
          alias[`${depName}$`] = path.join(gitRoot, depPackagePath, entryPoint.replace(`\\/${outputPath}\\/`, '/src/'));
        }
      }
    } else {
      // Non-standard package such as ie11-custom-properties
      alias[`${depName}$`] = path.join(gitRoot, depPackagePath, entryPoint);
      alias[`${depName}/`] = path.join(gitRoot, depPackagePath);
    }
  });

  const outputPath = getOutputPath(packageJson.module || packageJson.main);

  alias[`${packageJson.name}$`] = path.join(cwd, useLib ? outputPath : 'src');
  alias[`${packageJson.name}/src`] = path.join(cwd, 'src');

  // This is just needed for demo apps that load package readmes
  alias[`${packageJson.name}/README.md`] = path.join(cwd, 'README.md');

  alias[`${packageJson.name}/${outputPath}`] = path.join(cwd, useLib ? outputPath : 'src');

  return alias;
}

module.exports = getResolveAlias;

// @ts-ignore
if (require.main === module) {
  console.log(getResolveAlias());
}
