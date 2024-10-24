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

const workersConfig = { maxWorkers: process.env.FLUENT_WORKER || '50%' };
console.log({ workerEnv: process.env.FLUENT_WORKER, workersConfig });

exports.workersConfig = workersConfig;
