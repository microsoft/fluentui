// @ts-check
import createAzureStorage from 'monosize-storage-azure';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  repository: 'https://github.com/microsoft/fluentui',
  storage: createAzureStorage({
    endpoint: 'https://fluentbundlesize.azurewebsites.net/api/latest',
  }),
};

export default config;
