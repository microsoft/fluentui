// @ts-check

const concurrently = require('concurrently');

concurrently(
  [
    'cd ../fabric-website-resources && node ../../scripts/just.js webpack-dev-server',
    'npx wait-on http://localhost:4322 && node ../../scripts/just.js jest -u'
  ],
  {
    killOthers: ['success', 'failure'],
    successCondition: 'first'
  }
);
