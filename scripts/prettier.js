const execSync = require('./exec-sync');
const { resolve } = require('path');

const prettierPath = 'node ' + resolve(__dirname, './node_modules/prettier/bin/prettier.js');
const configPath = resolve(__dirname, '../.prettierrc');
let args = '';

if (process.argv.length > 2) {
  args = process.argv.slice(2).join(' ');
}

execSync(`${prettierPath} --config ${configPath} ${args}`);
