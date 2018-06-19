module.exports = function(options) {
  const exec = require('../exec');
  const path = require('path');
  const fs = require('fs');
  const resolve = require('resolve');
  const msCustomRulesMain = resolve.sync('tslint-microsoft-contrib');
  const rulesPath = path.dirname(msCustomRulesMain);
  const projectPath = path.resolve(process.cwd(), 'tsconfig.json');
  const sourcePath = path.resolve(process.cwd(), 'src/**/*.ts*');
  const tslintPath = 'node ' + resolve.sync('tslint/lib/tslint-cli');

  return exec(`${tslintPath} --project ${projectPath} -t stylish -r ${rulesPath}`, undefined, undefined, process);
};
