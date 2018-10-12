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

const originalCommitish = getOriginalCommitish();
const prereleaseName = getPrereleaseName(originalCommitish);
execSync(`${gitCmd} checkout -b ${prereleaseName}`);
execSync(`${process.execPath} ${rushCmd} publish -a --prerelease-name prelease ${prereleaseName}`);
