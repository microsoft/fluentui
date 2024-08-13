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
  const res = spawnSync('nx', ['show', 'projects', '--affected', `--base=${base}`, '--json'], {
    cwd: workspaceRoot,
    shell: true,
  });

  if (res.status !== 0) {
    console.error(res.stderr);
    throw new Error(`'nx show projects --affected --base ${base} --json' failed with status ${res.status}`);
  }

  const output = res.stdout.toString();
  /** @type {string[]} */
  const projects = JSON.parse(output);

  return new Set(projects);
}

exports.getAffectedPackages = getAffectedPackages;
