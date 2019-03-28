const concurrently = require('concurrently');

concurrently(['cd ../fabric-website-resources && npm run start', 'npx wait-on http://localhost:4322 && npm run generate-reports'], {
  killOthers: ['success', 'failure'],
  successCondition: 'first'
}).then(
  () => {},
  () => {
    exit(1);
  }
);
