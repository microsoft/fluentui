// @ts-check

const { execSync } = require('child_process');
const concurrently = require('concurrently');

if (process.env.BUILD_SOURCEBRANCH) {
  // CI environment. Run tests against PR deploy site
  execSync('node ../../scripts/just.js jest');
} else {
  // Local environment. Start dev server and run tests
  concurrently(
    [
      'cd ../fabric-website-resources && node ../../scripts/just.js webpack-dev-server',
      'npx wait-on http://localhost:4322 && node ../../scripts/just.js jest'
    ],
    {
      killOthers: ['success', 'failure'],
      successCondition: 'first'
    }
  );
}
