const nodePath = require('path');

const registerTsProject = (path, configFilename = 'tsconfig.json') => {
  // Function to register transpiler that returns cleanup function
  let registerTranspiler;

  const tsConfigPath = nodePath.join(path, configFilename);
  const cleanupFunctions = [registerTsConfigPaths(tsConfigPath)];

  // We can fall back on ts-node if its available
  const tsNodeInstalled = packageIsInstalled('ts-node/register');
  if (tsNodeInstalled) {
    warnTsNodeUsage();
    const { register } = require('ts-node');

    // ts-node doesn't provide a cleanup method
    registerTranspiler = () => {
      register({
        project: tsConfigPath,
        transpileOnly: true,
        compilerOptions: {
          module: 'commonjs',
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    };
  }

  if (registerTranspiler) {
    cleanupFunctions.push(registerTranspiler());
  } else {
    warnNoTranspiler();
  }

  // Overall cleanup method cleans up tsconfig path resolution
  // as well as ts transpiler
  return () => {
    for (const f of cleanupFunctions) {
      f();
    }
  };
};

module.exports = { registerTsProject };

function warnNoTranspiler() {
  console.warn(
    `Unable to locate swc-node or ts-node. Nx will be unable to run local ts files without transpiling.
  - To fix this, ensure @swc-node/register and @swc/core have been installed`,
  );
}
function warnTsNodeUsage() {
  console.warn(
    `Falling back to ts-node for local typescript execution. This may be a little slower.
  - To fix this, ensure @swc-node/register and @swc/core have been installed`,
  );
}

function packageIsInstalled(m) {
  try {
    // eslint-disable-next-line no-unused-vars
    const _path = require.resolve(m);
    return true;
  } catch {
    return false;
  }
}

function registerTsConfigPaths(tsConfigPath) {
  try {
    /**
     * Load the ts config from the source project
     */
    const tsconfigPaths = require('tsconfig-paths');
    const tsConfigResult = tsconfigPaths.loadConfig(tsConfigPath);
    /**
     * Register the custom workspace path mappings with node so that workspace libraries
     * can be imported and used within project
     */
    if (tsConfigResult.resultType === 'success') {
      return tsconfigPaths.register({
        baseUrl: tsConfigResult.absoluteBaseUrl,
        paths: tsConfigResult.paths,
      });
    }
  } catch (err) {
    warnNoTsconfigPaths();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {};
}

function warnNoTsconfigPaths() {
  console.warn(
    `Unable to load tsconfig-paths, workspace libraries may be inaccessible.
  - To fix this, install tsconfig-paths with npm/yarn/pnpm`,
  );
}
