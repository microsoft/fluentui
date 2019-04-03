// @ts-check

const concurrently = require('concurrently');

concurrently(
  [
    'cd ../fabric-website-resources && node ../../scripts/just.js webpack-dev-server',
    'npx wait-on http://localhost:4322 && npm run generate-reports'
  ],
  {
    killOthers: ['success', 'failure'],
    successCondition: 'first'
  }
);
