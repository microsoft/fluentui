const { preset, just } = require('@uifabric/build');
const { chain, task } = just;

preset();

chain('verify-api-extractor').after('build');
chain('validate-good-fences').before('validate');
