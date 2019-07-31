const fs = require('fs-extra');
const { spawnSync } = require('child_process');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

function convertChangeFiles() {
  const root = path.resolve(__dirname, '../');
  const changePath = path.join(root, 'change');

  if (!fs.existsSync(changePath)) {
    fs.mkdirpSync(changePath);
  }

  const legacyChangeFiles = glob.sync('common/changes/**/*.json');

  legacyChangeFiles.forEach(legacy => {
    const fileStat = fs.statSync(legacy);
    const legacyJson = JSON.parse(fs.readFileSync(legacy, 'utf-8'));

    legacyJson.changes.forEach(change => {
      const beachballChangeJson = {
        comment: change.comment || 'No comment',
        type: change.type,
        packageName: change.packageName,
        email: legacyJson.email,
        commit: getCommitByFile(legacy),
        date: fileStat.ctime.toISOString()
      };

      const prefix = change.packageName.replace(/[^a-zA-Z0-9@]/g, '-');

      fs.writeFileSync(
        path.join(changePath, `${prefix}-${getTimeStamp(fileStat.ctime)}.json`),
        JSON.stringify(beachballChangeJson, null, 2)
      );
    });

    fs.removeSync(legacy);
  });
}

function getCommitByFile(file) {
  const results = spawnSync('git', ['log', '-n', '1', '--pretty=format:%H', '--', file]);
  if (results.status === 0) {
    return results.stdout.toString().trim();
  }

  return 'not available';
}

function leftPadTwoZeros(someString) {
  return ('00' + someString).slice(-2);
}

function getTimeStamp(date) {
  return [
    date.getFullYear(),
    leftPadTwoZeros((date.getMonth() + 1).toString()),
    leftPadTwoZeros(date.getDate().toString()),
    leftPadTwoZeros(date.getHours().toString()),
    leftPadTwoZeros(date.getMinutes().toString()),
    leftPadTwoZeros(date.getSeconds().toString())
  ].join('-');
}

module.exports = convertChangeFiles;

if (require.main === module) {
  convertChangeFiles();
  console.log(chalk.green('git status:'));
  spawnSync('git', ['status'], { stdio: 'inherit' });
  console.log(chalk.cyan('Conversion successful! Be sure to git add & git commit & git push this!!'));
}
