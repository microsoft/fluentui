import * as childProcess from 'child_process';

const sh = (command: string, cwd?: string, pipeOutputToResult: boolean = false): Promise<string> =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');

    const options: childProcess.SpawnOptions = {
      cwd: cwd || process.cwd(),
      env: process.env,
      stdio: pipeOutputToResult ? 'pipe' : [0, 1, 2],
      shell: true,
    };

    const child = childProcess.spawn(cmd, args, options);

    let stdoutData = '';

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdoutData += data;
      });
    }

    child.on('close', code => {
      if (code === 0) {
        resolve(stdoutData);
      }

      reject(new Error(`child process exited with code ${code}`));
    });
  });

export default sh;
