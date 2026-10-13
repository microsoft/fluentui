import { fork, type ChildProcess } from 'node:child_process';
import * as path from 'node:path';

export interface CliProgress {
  update(text: string): void;
  log(text: string): void;
}

const quietProgress: CliProgress = { update: () => undefined, log: () => undefined };

export async function withCliProgress<Result>(
  message: string,
  task: (progress: CliProgress) => Result | Promise<Result>,
  options: { enabled?: boolean } = {},
): Promise<Result> {
  const ci = process.env.CI;
  if (
    options.enabled === false ||
    !process.stdout.isTTY ||
    !process.stderr.isTTY ||
    process.env.TERM === 'dumb' ||
    (ci && ci !== 'false' && ci !== '0')
  ) {
    return task(quietProgress);
  }

  const renderer = await startRenderer(message);
  if (!renderer) {
    return task(quietProgress);
  }
  const send = (type: 'update' | 'log', text: string) => {
    if (!renderer.connected) {
      return;
    }
    try {
      renderer.send({ type, text }, () => undefined);
    } catch {
      return;
    }
  };
  const progress: CliProgress = { update: text => send('update', text), log: text => send('log', text) };
  const terminate = () => {
    renderer.kill('SIGTERM');
  };
  process.once('exit', terminate);
  try {
    return await task(progress);
  } finally {
    await stopRenderer(renderer);
    process.removeListener('exit', terminate);
  }
}

function startRenderer(message: string): Promise<ChildProcess | undefined> {
  let renderer: ChildProcess;
  try {
    renderer = fork(path.join(__dirname, 'progress-renderer.js'), [message], {
      stdio: ['ignore', 'ignore', 'inherit', 'ipc'],
      execArgv: [],
    });
  } catch {
    return Promise.resolve(undefined);
  }

  return new Promise(resolve => {
    let settled = false;
    const finish = (ready: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      renderer.removeListener('message', onMessage);
      renderer.removeListener('exit', onExit);
      if (!ready) {
        renderer.kill('SIGTERM');
      }
      resolve(ready ? renderer : undefined);
    };
    const onMessage = (value: unknown) => {
      if (value === 'ready') {
        finish(true);
      }
    };
    const onExit = () => finish(false);
    const timeout = setTimeout(() => finish(false), 1000);
    timeout.unref();
    renderer.on('message', onMessage);
    renderer.once('exit', onExit);
    renderer.on('error', () => finish(false));
  });
}

function stopRenderer(renderer: ChildProcess): Promise<void> {
  if (renderer.exitCode !== null || renderer.signalCode !== null) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    const timeout = setTimeout(() => renderer.kill('SIGKILL'), 1000);
    timeout.unref();
    renderer.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
    if (!renderer.connected) {
      renderer.kill('SIGTERM');
      return;
    }
    try {
      renderer.send('stop', error => {
        if (error) {
          renderer.kill('SIGTERM');
        }
      });
    } catch {
      renderer.kill('SIGTERM');
    }
  });
}
