import { type ExecSyncOptions, execSync, spawn } from 'node:child_process';

import { getPackageManagerCommand, output, workspaceRoot } from '@nx/devkit';

function isVerbose() {
  return process.env.NX_VERBOSE_LOGGING === 'true' || process.argv.includes('--verbose');
}
function isVerboseE2ERun() {
  return process.env.NX_E2E_VERBOSE_LOGGING === 'true' || isVerbose();
}
function runCommand(command: string, options?: Partial<ExecSyncOptions> & { failOnError?: boolean }): string {
  const { failOnError, ...childProcessOptions } = options ?? {};
  try {
    const r = execSync(command, {
      // cwd: tmpProjPath(),
      cwd: workspaceRoot,
      stdio: 'pipe',
      env: {
        // ...getStrippedEnvironmentVariables(),
        ...process.env,
        ...childProcessOptions?.env,
        FORCE_COLOR: 'false',
      },
      encoding: 'utf-8',
      ...childProcessOptions,
    });

    if (isVerboseE2ERun()) {
      output.log({
        title: `Command: ${command}`,
        bodyLines: [r as string],
        color: 'green',
      });
    }

    return r as string;
  } catch (e: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = e as any;
    // this is intentional
    // npm ls fails if package is not found
    console.error(`Original command: ${command}`, `${err.stdout}\n\n${err.stderr}`);

    if (!failOnError && (err.stdout || err.stderr)) {
      return err.stdout + err.stderr;
    }
    throw e;
  }
}

describe('start CLI', () => {
  it(`should behave...`, () => {
    process.env.NX_VERBOSE_LOGGING = 'true';
    const command = 'start';
    const pm = getPackageManagerCommand('yarn');
    const fullCommand = `${pm.exec} ${command}`;

    const log = runCommand(fullCommand);

    expect(log).toEqual(expect.stringContaining('WELCOME TO FLUENT UI'));
    expect(log).toEqual(expect.stringContaining('Select project to run'));
    // const logs = execSync(fullCommand, {
    //   // cwd: opts.cwd || tmpProjPath(),
    //   // env: {
    //   //   CI: 'true',
    //   //   // ...(opts.env || getStrippedEnvironmentVariables()),
    //   // },
    //   encoding: 'utf-8',
    //   stdio: 'pipe',
    //   maxBuffer: 50 * 1024 * 1024,
    // });
  }, 30000);

  it.skip('should run start', done => {
    const timeout = 2500;
    let timeoutId: NodeJS.Timeout;
    let log: string;

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
      log += data;
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
      console.log('cli output:', { log });

      global.clearTimeout(timeoutId); // Clear the timer if the process exits

      expect(log).toEqual(expect.stringContaining('WELCOME TO FLUENT UI'));
      expect(log).toEqual(expect.stringContaining('Select project to run'));

      done();
    });

    // Initialize the inactivity timer
    resetInactivityTimer();
  });
});
