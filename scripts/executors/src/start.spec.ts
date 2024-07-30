import { spawn } from 'node:child_process';

import { workspaceRoot } from '@nx/devkit';

describe('start CLI', () => {
  jest.setTimeout(30000);
  it('should run start', done => {
    const timeout = 2500;
    let timeoutId: NodeJS.Timeout;
    let output: string;

    const childProcess = spawn('yarn', ['start'], { cwd: workspaceRoot, stdio: 'pipe', shell: true });

    // Function to handle inactivity
    const handleInactivity = () => {
      if (!childProcess.killed) {
        console.log('No new data received within the timeout period.');
      }
      // Handle the inactivity case, e.g., terminate the child process
      childProcess.kill();
    };

    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
      global.clearTimeout(timeoutId);
      timeoutId = global.setTimeout(handleInactivity, timeout);
    };

    // Set up listeners for stdout and stderr
    childProcess.stdout.on('data', data => {
      output += data;
      if (!childProcess.killed) {
        console.log(`stdout: ${data}`);
        resetInactivityTimer();
      }
    });

    childProcess.stderr.on('data', data => {
      if (!childProcess.killed) {
        console.error(`stderr: ${data}`);
        resetInactivityTimer();
      }
    });

    // Set up listener for exit
    childProcess.on('exit', code => {
      console.info(`Child process exited with code ${code}`);
      console.log('cli output:', { output });

      global.clearTimeout(timeoutId); // Clear the timer if the process exits

      expect(output).toEqual(expect.stringContaining('WELCOME TO FLUENT UI'));
      expect(output).toEqual(expect.stringContaining('Select project to run'));

      done();
    });

    // Initialize the inactivity timer
    resetInactivityTimer();
  });
});
