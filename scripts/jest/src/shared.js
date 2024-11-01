/**
 *  **Local Machine:**
 *
 * jest is resource greedy. on local machine it will spawn workers into all your CPU threads which will provide additional heat up of your machine and everything else will be blocked.
 * Based on tests on local machine, 50% of CPU threads is the best value for local development ( also the fastest).
 *
 *  **CI:**
 *
 * based on testing spawning only 50% of available workers is fastest on both Local Machine and CI env atm ( 8 Core machine, 16GB RAM)
 */

// - for macos large runner on GHA we need to set it to 2 {@link file://./../../../.github/workflows/pr.yml#77}
// - for ADO runners it's 50%
// - temporary adding FLUENT_JEST_WORKER var in order to make it pass on both GHA and ADO
const workersConfig = { maxWorkers: process.env.FLUENT_JEST_WORKER || '50%' };

exports.workersConfig = workersConfig;

// @ts-expect-error -- unused var
// eslint-disable-next-line no-unused-vars
function isCI() {
  return (
    (process.env.CI && process.env.CI !== 'false') ||
    (process.env.TF_BUILD && process.env.TF_BUILD.toLowerCase() === 'true') ||
    process.env.GITHUB_ACTIONS === 'true'
  );
}
