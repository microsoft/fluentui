module.exports = function (options) {
  const execSync = require('../exec-sync');
  const path = require('path');
  const msCustomRulesMain = require.resolve('tslint-microsoft-contrib');
  const rulesPath = path.dirname(msCustomRulesMain);
  const projectPath = path.resolve(process.cwd(), 'tsconfig.json');
  const sourcePath = path.resolve(process.cwd(), 'src/**/*.ts*');

  execSync(`tslint --project ${projectPath} -t stylish -r ${rulesPath}`);
};
