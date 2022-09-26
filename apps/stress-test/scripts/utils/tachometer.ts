import { ConfigResult } from './types';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ensureClean } from './paths.js';

const execAsync = promisify(exec);

type RunTachometer = (testConfigs: ConfigResult[]) => void;

const runTachometer: RunTachometer = async testConfigs => {
  // Everything will be going to the same results folder for a test run
  const { resultsDir } = testConfigs[0];
  ensureClean(resultsDir);

  for (const testConfig of testConfigs) {
    const { testFile, resultsFile } = testConfig;
    console.log('\n--------------------\n');
    console.log(`Running test case "${testFile}...`);
    const cmd = `tach --config ${testFile} --json-file ${resultsFile}`;

    // Make sure we run these in sequence.
    // We don't want to run several tests at once as they
    // may unduly influence each other.
    const res = await execAsync(cmd);
    console.log(res.stdout);
    console.log(`Test complete! Results written to ${resultsFile}.`);
  }
};

export default runTachometer;
