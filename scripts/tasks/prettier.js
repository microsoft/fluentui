module.exports = function() {
  const childProcess = require('child_process');
  const path = require('path');
  const fs = require('fs');
  const sourcePath = path.join(process.cwd(), '**', '*.{ts,tsx,json,js}');
  const prettierPath = 'node ' + path.resolve(__dirname, '../node_modules/prettier/bin-prettier.js');
  const prettierIgnorePath = path.resolve(path.join(__dirname, '..', '..', '.prettierignore'));

  const prettierConfigPath = path.join(process.cwd(), '..', '..', 'packages', 'prettier-rules', 'prettier.config.js');

  try {
    fs.accessSync(prettierConfigPath, fs.constants.R_OK);
  } catch (err) {
    console.error('Can not find prettier.config.js');

    process.exit(1);
  }

  const prettierCommand = `${prettierPath} --config ${prettierConfigPath} --ignore-path "${prettierIgnorePath}" --write "${sourcePath}"`;
  childProcess.execSync(prettierCommand);
};
