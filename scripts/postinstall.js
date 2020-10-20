const { spawnSync } = require('child_process');
const chalk = require('chalk');

// git v2.9.0 supports a custom hooks directory. This means we just need to check in the hooks scripts.
spawnSync('git', ['config', 'core.hooksPath', '.githooks']);

// logs All dependencies are installed! This repo no longer requires a build to start the inner loop.
console.log(
  chalk.green('\nAll dependencies are installed! This repo no longer requires a build to start the inner loop.'),
);
// logs For inner loop development and does more stuff
console.log(`For inner loop development, run:
  ${chalk.yellow('yarn start')}
`);
