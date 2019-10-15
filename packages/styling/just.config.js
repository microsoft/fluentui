const { preset, just } = require('@uifabric/build');
const { chain, task } = just;

preset();

chain('verify-api-extractor').after('build');
