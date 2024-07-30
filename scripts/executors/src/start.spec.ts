import { spawn } from 'node:child_process';

import { workspaceRoot } from '@nx/devkit';

describe('start CLI', () => {
  jest.setTimeout(30000);
  it('should run start', done => {
    const timeout = 5000;
    let timeoutId: NodeJS.Timeout;
    let output: string;

    const childProcess = spawn('yarn', ['start'], { cwd: workspaceRoot, stdio: 'pipe' });

    // Function to handle inactivity
    const handleInactivity = () => {
      console.log('No new data received within the timeout period.');
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
      resetInactivityTimer();
    });

    childProcess.stderr.on('data', data => {
      resetInactivityTimer();
    });

    // Set up listener for exit
    childProcess.on('exit', code => {
      console.log(`Child process exited with code ${code}`);
      clearTimeout(timeoutId); // Clear the timer if the process exits
      expect(output).toEqual(expect.stringContaining('WELCOME TO FLUENT UI'));
      expect(output).toEqual(expect.stringContaining('Select project to run'));
      done();
    });

    // Initialize the inactivity timer
    resetInactivityTimer();
  });
});
