// monosize.config.mjs
import storageAdapter from 'monosize-storage-azure';

export default {
  repository: 'https://github.com/microsoft/fluentui',
  storage: storageAdapter(),
  webpack: config => {
    // customize config here
    return config;
  },
};
