const { spawnSync } = require('child_process');
const lernaBin = require.resolve('lerna/cli.js');

const argv = process.argv.slice(2);
const [project, ...rest] = argv;

spawnSync(lernaBin, ['run', 'build', '--scope', project, '--include-filtered-dependencies', '--stream', '--', ...rest], {
  stdio: 'inherit'
});
