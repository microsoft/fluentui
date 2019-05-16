// @ts-check

const { execSync } = require('child_process');
const concurrently = require('concurrently');

if (process.env.BUILD_SOURCEBRANCH) {
  // CI environment. Run tests against PR deploy site
  execSync('npx just-scripts jest');
} else {
  // Local environment. Start dev server and run tests
  concurrently(
    ['cd ../fabric-website-resources && npx just-scripts webpack-dev-server', 'npx wait-on http://localhost:4322 && npx just-scripts jest'],
    {
      killOthers: ['success', 'failure'],
      successCondition: 'first'
    }
  );
}
