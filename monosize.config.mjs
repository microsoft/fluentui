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
