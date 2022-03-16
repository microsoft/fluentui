import portfinder from 'portfinder';
import { spawn } from 'child_process';
import { promisify } from 'util';
import waitOn from 'wait-on';
import getStorybookDependencies from '../storybook/getStorybookDependencies';

const exec = promisify(require('child_process').exec);

export async function e2e() {
  let port: number;
  try {
    port = await portfinder.getPortPromise();
  } catch (e) {
    console.error('failed to get port for e2e test');
    throw e;
  }

  console.log('starting storybook on port', port);
  const dependenciesToBuild = getStorybookDependencies();

  const dependencyBuildCommand = `lage build --to ${dependenciesToBuild.map(dep => dep.name).join(' ')}`;
  exec(dependencyBuildCommand);

  const storybookProcess = spawn('yarn', ['start-storybook', '-p', port.toString()], {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: true,
  });
  console.log(storybookProcess.pid);

  await waitOn({ resources: [`http://localhost:${port}`] });
  console.log('storybook started on port', port);

  const cypressProcess = spawn('yarn', ['e2e', '--mode', 'run', '--port', port.toString()], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });

  return new Promise<void>((res, rej) => {
    storybookProcess.kill();
    cypressProcess.on('exit', code => {
      if (code !== 0) {
        rej();
      }

      res();
    });
  });
}
