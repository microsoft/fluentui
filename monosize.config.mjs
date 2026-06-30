// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import webpackBundler from 'monosize-bundler-webpack';
import createAzureStorage from 'monosize-storage-azure';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  repository: 'https://github.com/microsoft/fluentui',
  storage: createAzureStorage({
    authType: 'DefaultAzureCredential',
    endpoint: 'https://fluent-bundlesize.azurewebsites.net/api/fluentuilatest',
    tableName: 'fluentuilatest',
  }),
  bundler: webpackBundler(config => {
    config.externals = config.externals ?? {};
    config.externals = {
      react: 'React',
      'react/jsx-runtime': 'jsxRuntime',
      'react-dom': 'ReactDOM',
      'react/compiler-runtime': 'ReactCompilerRuntime',
    };
    // ESM-first packages emit bare subpath imports (e.g. `use-sync-external-store/shim`) that lack
    // a file extension. Once measured packages are `type: module`, webpack treats their `lib/` as
    // ESM and enforces fully-specified imports; disable that so legacy CJS deps still resolve.
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({ test: /\.[cm]?js$/, resolve: { fullySpecified: false } });
    return config;
  }),
  reportResolvers: {
    packageName: async packageRoot => {
      const packageJson = await fs.promises.readFile(path.join(packageRoot, 'package.json'), 'utf-8');
      const json = JSON.parse(packageJson);
      return json.name.replace('@fluentui/', '');
    },
  },
};

export default config;
