// @ts-check

const { eslintTask } = require('just-scripts');
const path = require('path');

exports.eslint = eslintTask({
  configPath: path.join(process.cwd(), '.eslintrc.json'),
  // TODO: also lint config files?
  files: [path.join(process.cwd(), 'src')],
});
