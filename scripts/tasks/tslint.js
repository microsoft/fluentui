module.exports = function (options) {
  const requireResolveCwd = require('../require-resolve-cwd');
  const execSync = require('../exec-sync');
  const path = require('path');
  const fs = require('fs');
  const msCustomRulesMain = requireResolveCwd('tslint-microsoft-contrib');
  const rulesPath = path.dirname(msCustomRulesMain);
  const projectPath = path.resolve(process.cwd(), 'tsconfig.json');
  const sourcePath = path.resolve(process.cwd(), 'src/**/*.ts*');
  const tslintPath = 'node ' + requireResolveCwd('tslint/lib/tslint-cli');

  execSync(`${tslintPath} --project ${projectPath} -t stylish -r ${rulesPath}`);
};
