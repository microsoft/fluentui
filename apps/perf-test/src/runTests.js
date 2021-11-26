const { spawnSync } = require('child_process');
const path = require('path');

const cwd = path.resolve(__dirname, '..');

const runs = 10;
for (let i = 0; i < runs; i++) {
  console.log('running', i);
  spawnSync('yarn', ['just', 'perf-test', '--', '--iterations', '1'], { cwd });
  spawnSync('node', ['src/getResults.js'], { cwd });
}
