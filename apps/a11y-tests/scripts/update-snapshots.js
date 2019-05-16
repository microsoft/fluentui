// @ts-check

const concurrently = require('concurrently');

concurrently(
  [
    'cd ../fabric-website-resources && npx just-scripts webpack-dev-server',
    'npx wait-on http://localhost:4322 && npx just-scripts jest -u'
  ],
  {
    killOthers: ['success', 'failure'],
    successCondition: 'first'
  }
);
