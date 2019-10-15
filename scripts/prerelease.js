// This is a script to be used for pre-release purposes, usually it is used for testing builds before an official package is published
// - This script reuses rush's capability of tacking on a prerelease tag onto the version number
// - By default the script will NOT perform any action, much like the rush publish command
// - This takes in and forwards all arguments to the rush publish command (e.g. -a -p)

const path = require('path');
const cp = require('child_process');
const rushCmd = path.resolve(__dirname, '../common/scripts/install-run-rush.js');
const gitCmd = 'git';

const execSync = function() {
  return cp.execSync.apply(this, arguments).toString();
};

function getPrereleaseName(originalCommitish) {
  const now = new Date();

  let suffix = '';

  if (process.env.BUILD_BUILDID) {
    suffix = process.env.BUILD_BUILDID;
  } else {
    suffix = `${now.getFullYear()}${now
      .getMonth()
      .toString()
      .padStart(2, '0')}${now
      .getDate()
      .toString()
      .padStart(2, '0')}${now
      .getHours()
      .toString()
      .padStart(2, '0')}${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  }

  return `prerelease-${originalCommitish}-${suffix}`;
}

function getOriginalCommitish() {
  let commitish = execSync(`${gitCmd} rev-parse --abbrev-ref HEAD`).trim();
  if (commitish === 'HEAD') {
    return execSync(`${gitCmd} rev-parse HEAD`).trim();
  }

  return commitish;
}

const extraArgs = process.argv.slice(2).join(' ');
const originalCommitish = getOriginalCommitish();
const prereleaseName = getPrereleaseName(originalCommitish);
execSync(`${gitCmd} checkout -b ${prereleaseName}`);
console.log(execSync(`${process.execPath} ${rushCmd} publish --prerelease-name ${prereleaseName} ${extraArgs}`));
execSync(`${gitCmd} reset --hard`);
execSync(`${gitCmd} checkout ${originalCommitish}`);
