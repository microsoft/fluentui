const path = require('path');
const execSync = require('child_process').execSync;
const rushCmd = path.resolve('../common/scripts/install-run-rush.js');
const gitCmd = 'git';

function getPrereleaseName(originalCommitish) {
  const now = new Date();

  let suffix = '';

  if (process.env.BUILD_BUILDID) {
    suffix = process.env.BUILD_BUILDID;
  } else {
    suffix = `${now.getFullYear()}${now.getMonth().padStart(2, '0')}${now.getDate().padStart(2, '0')}`;
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
execSync(`${rushCmd} publish -a --prerelease-name prelease ${prereleaseName}`);
