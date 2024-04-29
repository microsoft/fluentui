import { ConfigResult } from './types';
import { spawn } from 'child_process';
import { ensureClean } from './paths.js';

type RunTachometer = (testConfigs: ConfigResult[]) => void;

const maxAttempts = 3;

const executeCommand = (cmd: string) => {
  return new Promise((resolve, reject) => {
    const tach = spawn(cmd, { shell: true });

    tach.stdout.on('data', data => {
      console.log(data.toString());
    });

    tach.on('close', code => {
      resolve(code);
    });

    tach.on('error', err => {
      tach.kill();
      reject(err);
    });
  });
};

const runTachometer: RunTachometer = async testConfigs => {
  // Everything will be going to the same results folder for a test run
  const { resultsDir } = testConfigs[0];
  ensureClean(resultsDir);

  for (const testConfig of testConfigs) {
    const { testFile, resultsFile } = testConfig;
    console.log('\n--------------------\n');
    console.log(`Running test case "${testFile}...`);
    const cmd = `tach --config ${testFile} --json-file ${resultsFile}`;
    console.log(`Test command: ${cmd}`);

    let attempt = 0;
    let done = false;
    // Make sure we run these in sequence.
    // We don't want to run several tests at once as they
    // may unduly influence each other.
    while (!done) {
      try {
        await executeCommand(cmd);
        console.log(`Test complete! Results written to ${resultsFile}.`);
        done = true;
      } catch (err) {
        if (attempt < maxAttempts) {
          attempt++;
          console.error(`Error running Tachometer!`);
          console.error((err as Error).message);
          console.log('----------');
          console.log(`Trying again. Attempt ${attempt} of ${maxAttempts}.`);
        } else {
          throw err;
        }
      }
    }
  }
};

export default runTachometer;
