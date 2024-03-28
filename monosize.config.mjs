// @ts-check
import webpackBundler from 'monosize-bundler-webpack';
import createAzureStorage from 'monosize-storage-azure';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  repository: 'https://github.com/microsoft/fluentui',
  storage: createAzureStorage({
    endpoint: 'https://fluentbundlesize.azurewebsites.net/api/latest',
  }),
  bundler: webpackBundler(config => {
    return config;
  }),
};

export default config;
