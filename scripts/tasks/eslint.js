// @ts-check

const { eslintTask } = require('just-scripts');
const fs = require('fs');
const path = require('path');

let configPath = path.join(process.cwd(), '.eslintrc.json');
if (!fs.existsSync(configPath)) {
  configPath = path.join(process.cwd(), '.eslintrc.js');
}

exports.eslint = eslintTask({
  configPath,
  // TODO: also lint config files?
  files: [path.join(process.cwd(), 'src')],
  fix: process.argv.includes('--fix'),
});
