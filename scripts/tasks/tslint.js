module.exports = function (options) {
  const execSync = require('../exec-sync');
  const path = require('path');
  const msCustomRulesMain = require.resolve('tslint-microsoft-contrib');
  const rulesPath = path.dirname(msCustomRulesMain);
  const projectPath = path.resolve(process.cwd(), 'tsconfig.json');
  const sourcePath = path.resolve(process.cwd(), 'src/**/*.ts*');
  const tslintPath = 'node ' + path.resolve(__dirname, '../node_modules/tslint/lib/tslint-cli');

  execSync(`${tslintPath} --project ${projectPath} -t stylish -r ${rulesPath}`);
};
