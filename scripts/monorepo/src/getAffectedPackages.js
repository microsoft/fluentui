const { spawnSync } = require('child_process');

const findGitRoot = require('./findGitRoot');
const { getUncommittedFiles, getUntrackedFiles } = require('./utils');

/**
 * Indicator of what packages have been affected by changes
 * e.g. need to trigger a build
 *
 * @param {string} since - Commit to compare against
 * @returns {Set<string>} - Set of packages that are affected by in the current branch
 */
function getAffectedPackages(since = 'origin/master') {
  reportLageAffectedSinceResolution();
  const gitRoot = findGitRoot();
  const res = spawnSync('yarn', ['lage', 'info', '--since', since], { cwd: gitRoot, shell: true });
  if (res.status !== 0) {
    console.error(res.stderr);
    throw new Error(`yarn lage info --since ${since} failed with status ${res.status}`);
  }

  // Lage uses npmlog which defaults all output to stderr
  const output = res.stderr.toString().replace(/\b(info)\b/g, '');
  // Lage uses npmlog which defaults all output to stderr
  const info = JSON.parse(output);
  if (!info.scope || !Array.isArray(info.scope)) {
    throw new Error(`command \`yarn lage info ${since}\` failed to return the scope`);
  }

  return new Set(info.scope);
}

/**
 * @see https://github.com/microsoft/fluentui/issues/26147
 */
function reportLageAffectedSinceResolution() {
  const uncommittedGitFiles = [...getUncommittedFiles(), ...getUntrackedFiles()];
  if (uncommittedGitFiles.length > 0) {
    console.warn(
      '⚠️ NOTE:\n',
      'You workspace contains uncommitted or untracked files!\n',
      'This gives you false positives about true affected tree.\n',
      'To get proper results make sure you have clean git tree.\n\n',
    );
  }
}

exports.getAffectedPackages = getAffectedPackages;
