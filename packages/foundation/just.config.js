const { preset, just } = require('@uifabric/build');
const { chain } = just;

preset();

chain('verify-api-extractor').after('build');
