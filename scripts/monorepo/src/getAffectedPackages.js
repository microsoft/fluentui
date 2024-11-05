const { spawnSync } = require('child_process');

const { workspaceRoot } = require('./utils');

/**
 * Indicator of what packages have been affected by changes
 * e.g. need to trigger a build
 *
 * @param {string} base - Commit to compare against
 * @returns {Set<string>} - Set of packages that are affected by in the current branch
 */
function getAffectedPackages(base = 'origin/master') {
  const cmdArgs = [
    'show',
    'projects',
    '--affected',
    `--base=${base}`,
    '--json',
    // override NX_VERBOSE_LOGGING in order to emit valid JSON
    `--verbose=false`,
  ];
  const res = spawnSync('nx', cmdArgs, {
    cwd: workspaceRoot,
    shell: true,
  });

  if (res.status !== 0) {
    console.error(res.stderr);
    throw new Error(`'nx ${cmdArgs.join(' ')}' failed with status ${res.status}`);
  }

  const output = res.stdout.toString();
  /** @type {string[]} */
  const projects = JSON.parse(output);

  return new Set(projects);
}

exports.getAffectedPackages = getAffectedPackages;
