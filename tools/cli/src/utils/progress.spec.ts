import { EventEmitter } from 'node:events';
import { fork, type ChildProcess } from 'node:child_process';

import { withCliProgress } from './progress';

jest.mock('node:child_process', () => ({ fork: jest.fn() }));

describe('CLI progress', () => {
  const stdoutDescriptor = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY');
  const stderrDescriptor = Object.getOwnPropertyDescriptor(process.stderr, 'isTTY');
  const environment = { CI: process.env.CI, TERM: process.env.TERM };
  let child: ChildProcess;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.CI;
    process.env.TERM = 'xterm-256color';
    Object.defineProperty(process.stdout, 'isTTY', { configurable: true, value: true });
    Object.defineProperty(process.stderr, 'isTTY', { configurable: true, value: true });
    child = Object.assign(new EventEmitter(), {
      connected: true,
      exitCode: null,
      signalCode: null,
      send: jest.fn(message => {
        if (message === 'stop') {
          queueMicrotask(() => child.emit('exit', 0, null));
        }
        return true;
      }),
      kill: jest.fn(() => true),
    }) as unknown as ChildProcess;
    (fork as jest.Mock).mockImplementation(() => {
      queueMicrotask(() => child.emit('message', 'ready'));
      return child;
    });
  });

  afterEach(() => {
    for (const [stream, descriptor] of [
      [process.stdout, stdoutDescriptor],
      [process.stderr, stderrDescriptor],
    ] as const) {
      if (descriptor) {
        Object.defineProperty(stream, 'isTTY', descriptor);
      } else {
        Reflect.deleteProperty(stream, 'isTTY');
      }
    }
    for (const key of ['CI', 'TERM'] as const) {
      if (environment[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = environment[key];
      }
    }
  });

  it('uses independent stderr rendering and stops before returning the result', async () => {
    const result = await withCliProgress('Loading APIs...', () => {
      expect(child.send).not.toHaveBeenCalled();
      return 'result';
    });
    expect(result).toBe('result');
    expect(fork).toHaveBeenCalledWith(
      expect.stringContaining('progress-renderer.js'),
      ['Loading APIs...'],
      expect.objectContaining({ stdio: ['ignore', 'ignore', 'inherit', 'ipc'], execArgv: [] }),
    );
    expect(child.send).toHaveBeenCalledWith('stop', expect.any(Function));
  });

  it.each(['stdout', 'stderr'] as const)('stays quiet when %s is redirected', async stream => {
    Object.defineProperty(process[stream], 'isTTY', { configurable: true, value: false });
    await expect(withCliProgress('Loading APIs...', () => 'result')).resolves.toBe('result');
    expect(fork).not.toHaveBeenCalled();
  });

  it('forwards concise status updates and completion lines to the independent renderer', async () => {
    await withCliProgress('Building caches...', progress => {
      progress.update('Generating @fluentui/react from declarations...');
      progress.log('@fluentui/react: 400 records generated');
    });
    expect(child.send).toHaveBeenCalledWith(
      { type: 'update', text: 'Generating @fluentui/react from declarations...' },
      expect.any(Function),
    );
    expect(child.send).toHaveBeenCalledWith(
      { type: 'log', text: '@fluentui/react: 400 records generated' },
      expect.any(Function),
    );
  });

  it('provides quiet progress methods when progress is disabled for machine output', async () => {
    await withCliProgress(
      'Building caches...',
      progress => {
        progress.update('Generating...');
        progress.log('Ready');
      },
      { enabled: false },
    );
    expect(fork).not.toHaveBeenCalled();
  });

  it.each(['CI', 'TERM'] as const)('stays quiet for %s environments', async variable => {
    process.env[variable] = variable === 'CI' ? 'true' : 'dumb';
    await expect(withCliProgress('Loading APIs...', () => 'result')).resolves.toBe('result');
    expect(fork).not.toHaveBeenCalled();
  });

  it('cleans up and preserves task errors', async () => {
    const error = new Error('API unavailable');
    const listeners = process.listenerCount('exit');
    await expect(
      withCliProgress('Loading APIs...', () => {
        throw error;
      }),
    ).rejects.toBe(error);
    expect(child.send).toHaveBeenCalledWith('stop', expect.any(Function));
    expect(process.listenerCount('exit')).toBe(listeners);
  });

  it('does not fail the command when the renderer cannot start', async () => {
    (fork as jest.Mock).mockImplementation(() => {
      throw new Error('Unable to spawn');
    });
    await expect(withCliProgress('Loading APIs...', () => 'result')).resolves.toBe('result');
  });

  it('continues without progress if renderer initialization fails', async () => {
    (fork as jest.Mock).mockImplementation(() => {
      queueMicrotask(() => child.emit('error', new Error('Unable to spawn')));
      return child;
    });
    await expect(withCliProgress('Loading APIs...', () => 'result')).resolves.toBe('result');
  });
});
