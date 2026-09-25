import * as React from 'react';

import type { ResolvedPlaygroundRuntimeManifest } from './runtime';
import {
  CONSOLE_MESSAGES_PER_SECOND,
  PLAYGROUND_REGISTER_CALLBACK,
  createSandboxContentSecurityPolicy,
  createSandboxDocument,
} from './sandbox';

const manifest: ResolvedPlaygroundRuntimeManifest = {
  allowedModules: [],
  baseUrl: 'https://example.com/',
  buildId: 'test',
  scripts: [],
  styles: [],
  typings: 'https://example.com/typings.json',
};

function getBootstrap(token: string, parentOrigin?: string): string {
  const documentSource = createSandboxDocument(manifest, token, parentOrigin);
  const sandboxDocument = new DOMParser().parseFromString(documentSource, 'text/html');
  const bootstrap = sandboxDocument.querySelector('script:not([src])')?.textContent;
  if (!bootstrap) {
    throw new Error('Sandbox bootstrap not found');
  }
  return bootstrap;
}

function createRuntime(render: jest.Mock) {
  class Component {
    public props: Record<string, unknown>;
    public state: Record<string, unknown> = {};

    constructor(props: Record<string, unknown>) {
      this.props = props;
    }
  }

  return {
    React: {
      ...React,
      Component,
      createElement: (type: unknown, props?: Record<string, unknown>, ...children: unknown[]) => ({
        type,
        props: { ...props, children: children.length === 1 ? children[0] : children },
      }),
    },
    createRoot: () => ({ render }),
    moduleLoaders: {},
    setup: {},
  };
}

function startSandbox(
  token: string,
  render: jest.Mock,
  moduleLoaders: Record<string, () => Promise<unknown>> = {},
  parentOrigin?: string,
) {
  document.body.innerHTML = '<div id="root"></div>';
  // The production bootstrap is generated JavaScript that must execute inside the iframe global.
  // eslint-disable-next-line no-eval
  window.eval(getBootstrap(token, parentOrigin));
  const register = (window as unknown as Record<string, (runtime: unknown) => void>)[PLAYGROUND_REGISTER_CALLBACK];
  register({ ...createRuntime(render), moduleLoaders });
}

async function sendRun(token: string, code: string, runId = 7, extra: Record<string, unknown> = {}) {
  window.dispatchEvent(
    new MessageEvent('message', {
      source: window.parent,
      data: {
        source: 'fluentui-playground',
        token,
        type: 'run',
        code,
        requiredModules: [],
        runId,
        ...extra,
      },
    }),
  );
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

async function runSandbox(token: string, code: string, render: jest.Mock) {
  startSandbox(token, render);
  await sendRun(token, code);
}

function commit(render: jest.Mock) {
  const element = render.mock.calls[render.mock.calls.length - 1][0];
  const Boundary = element.type;
  const boundary = new Boundary(element.props);
  boundary.componentDidMount();
  return element;
}

describe('createSandboxContentSecurityPolicy', () => {
  it('trusts only the runtime origins and blocks network access elsewhere', () => {
    const policy = createSandboxContentSecurityPolicy({
      ...manifest,
      scripts: ['https://example.com/runtime.js', 'https://cdn.example.net/chunk.js'],
    });
    const directives = Object.fromEntries(
      policy.split('; ').map(directive => {
        const [name, ...values] = directive.split(' ');
        return [name, values];
      }),
    );

    expect(directives['default-src']).toEqual(["'none'"]);
    expect(directives['script-src']).toEqual([
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://example.com',
      'https://cdn.example.net',
    ]);
    expect(directives['connect-src']).toEqual(['https://example.com', 'https://cdn.example.net']);
    expect(directives['form-action']).toEqual(["'none'"]);
    expect(directives['frame-src']).toEqual(["'none'"]);
  });

  it('is emitted before any script or stylesheet', () => {
    const source = createSandboxDocument({ ...manifest, styles: ['https://example.com/a.css'] }, 'token');
    const csp = source.indexOf('Content-Security-Policy');

    expect(csp).toBeGreaterThan(-1);
    expect(csp).toBeLessThan(source.indexOf('<base'));
    expect(csp).toBeLessThan(source.indexOf('<link'));
    expect(csp).toBeLessThan(source.indexOf('<script'));
  });
});

describe('sandbox bootstrap', () => {
  let postMessage: jest.SpyInstance;
  const consoleMethods = { ...console };

  beforeEach(() => {
    postMessage = jest.spyOn(window.parent, 'postMessage').mockImplementation(() => undefined);
  });

  afterEach(() => {
    postMessage.mockRestore();
    Object.assign(console, consoleMethods);
  });

  it('targets the shell origin when it is known', async () => {
    const render = jest.fn();
    startSandbox('origin-token', render, {}, 'https://shell.example.com');
    await sendRun('origin-token', 'exports.default = () => null;');
    commit(render);

    expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }), 'https://shell.example.com');
    expect(postMessage).not.toHaveBeenCalledWith(expect.anything(), '*');
  });

  it('forwards formatted console output tagged with the current run', async () => {
    const log = jest.fn();
    console.log = log;
    console.error = jest.fn();
    const render = jest.fn();
    startSandbox('console-token', render);
    const circular: Record<string, unknown> = { name: 'root' };
    circular.self = circular;
    await sendRun(
      'console-token',
      'console.log("count %d of %s", 3, "items", { a: [1, "b"] }); exports.default = () => null;',
      4,
    );
    console.error(new Error('boom'), circular);

    expect(log).toHaveBeenCalledWith('count %d of %s', 3, 'items', { a: [1, 'b'] });
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'console', level: 'log', runId: 4, message: 'count 3 of items { a: [1, "b"] }' }),
      '*',
    );
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'console',
        level: 'error',
        message: 'Error: boom { name: "root", self: [Circular] }',
      }),
      '*',
    );
  });

  it('summarizes console floods instead of forwarding every message', async () => {
    jest.useFakeTimers();
    try {
      console.log = jest.fn();
      startSandbox('flood-token', jest.fn());
      for (let index = 0; index < CONSOLE_MESSAGES_PER_SECOND + 20; index++) {
        console.log(index);
      }
      const forwarded = postMessage.mock.calls.filter(([message]) => message.type === 'console');
      expect(forwarded).toHaveLength(CONSOLE_MESSAGES_PER_SECOND);

      jest.advanceTimersByTime(1000);
      expect(postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'console',
          level: 'warn',
          message: expect.stringContaining('20 console messages'),
        }),
        '*',
      );
    } finally {
      jest.useRealTimers();
    }
  });

  it('disposes timers and global listeners of a module version when a newer version renders', async () => {
    const render = jest.fn();
    startSandbox('effects-token', render);
    const probe = { ticks: 0, resizes: 0 };
    (window as unknown as { probe: typeof probe }).probe = probe;
    jest.useFakeTimers();
    try {
      await sendRun(
        'effects-token',
        'setInterval(() => probe.ticks++, 10); window.addEventListener("resize", () => probe.resizes++); exports.default = () => null;',
        1,
      );
      commit(render);
      jest.advanceTimersByTime(30);
      window.dispatchEvent(new Event('resize'));
      expect(probe).toEqual({ ticks: 3, resizes: 1 });

      // A failing version keeps the previous one (and its effects) alive.
      await sendRun('effects-token', 'setInterval(() => probe.ticks += 100, 10); throw new Error("broken");', 2);
      jest.advanceTimersByTime(10);
      expect(probe.ticks).toBe(4);

      await sendRun('effects-token', 'exports.default = () => null;', 3);
      jest.advanceTimersByTime(30);
      window.dispatchEvent(new Event('resize'));
      expect(probe).toEqual({ ticks: 4, resizes: 1 });
    } finally {
      jest.useRealTimers();
      delete (window as unknown as { probe?: unknown }).probe;
    }
  });

  it('reports success only after the render boundary commits', async () => {
    const render = jest.fn();
    await runSandbox('success-token', 'exports.default = () => null;', render);

    expect(render).toHaveBeenCalledTimes(1);
    expect(postMessage).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }), '*');

    const guardedElement = render.mock.calls[0][0];
    const Boundary = guardedElement.type;
    const boundary = new Boundary(guardedElement.props);
    boundary.componentDidMount();

    expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'success', runId: 7 }), '*');
  });

  it('reports component render errors without reporting success', async () => {
    const render = jest.fn();
    await runSandbox('error-token', 'exports.default = () => { throw new Error("render failed"); };', render);

    const guardedElement = render.mock.calls[0][0];
    const Boundary = guardedElement.type;
    const boundary = new Boundary(guardedElement.props);
    const componentElement = boundary.render();
    let renderError: Error | undefined;
    try {
      componentElement.type();
    } catch (error) {
      renderError = error as Error;
    }
    boundary.state = guardedElement.type.getDerivedStateFromError(renderError);
    boundary.componentDidCatch(renderError);
    boundary.componentDidMount();

    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', kind: 'runtime', message: 'Error: render failed', runId: 7 }),
      '*',
    );
    expect(postMessage).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }), '*');
  });

  it('completes an empty-source run with an export error', async () => {
    await runSandbox('empty-token', '', jest.fn());

    expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'error', kind: 'export', runId: 7 }), '*');
  });

  it('reports asynchronous errors for the active run', async () => {
    await runSandbox('async-token', 'exports.default = () => null;', jest.fn());

    window.dispatchEvent(new ErrorEvent('error', { error: new Error('async failed') }));

    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', kind: 'runtime', message: 'Error: async failed', runId: 7 }),
      '*',
    );
  });

  it('reuses the component for CSS and theme updates but remounts on explicit runs or changed locals', async () => {
    const render = jest.fn();
    const loader = jest.fn().mockResolvedValue({});
    startSandbox('live-token', render, { example: loader });
    const code = 'require("example"); exports.default = () => null;';
    const css = { specifier: './style.module.css', locals: { root: 'root-class' }, cssText: '.root-class {}' };
    await sendRun('live-token', code, 1, { requiredModules: ['example'], cssModules: [css] });
    const first = commit(render);
    await sendRun('live-token', code, 2, {
      requiredModules: ['example'],
      preserveState: true,
      themeId: 'dark',
      cssModules: [{ ...css, cssText: '.root-class { display: flex; }' }],
    });
    const styled = commit(render);
    expect(styled.props.children.type).toBe(first.props.children.type);
    expect(styled.props.key).toBe(first.props.key);
    expect(loader).toHaveBeenCalledTimes(1);
    expect(document.querySelector('style[data-playground-css]')?.textContent).toContain('display: flex');

    await sendRun('live-token', code, 3, { requiredModules: ['example'], cssModules: [css] });
    const manual = commit(render);
    expect(manual.props.children.type).not.toBe(styled.props.children.type);
    expect(manual.props.key).not.toBe(styled.props.key);

    await sendRun('live-token', code, 4, {
      preserveState: true,
      requiredModules: ['example'],
      cssModules: [{ ...css, locals: { root: 'root-class', added: 'new-class' } }],
    });
    expect(commit(render).props.key).toBe(4);
  });

  it('retains the previous DOM and styles when module evaluation fails and recovers on the next run', async () => {
    const render = jest.fn();
    startSandbox('retained-token', render);
    await sendRun('retained-token', 'exports.default = () => null;', 1, {
      cssModules: [{ specifier: './style.module.css', locals: {}, cssText: 'button { display: block; }' }],
    });
    commit(render);
    await sendRun('retained-token', 'throw new Error("evaluation failed");', 2, {
      cssModules: [{ specifier: './style.module.css', locals: {}, cssText: 'button { display: none; }' }],
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(document.querySelector('style[data-playground-css]')?.textContent).toContain('display: block');
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', runId: 2, previewRetained: true }),
      '*',
    );
    await sendRun('retained-token', 'exports.default = () => null;', 3);
    commit(render);
    expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'success', runId: 3 }), '*');
  });

  it('does not evaluate or report obsolete lazy imports after a newer run', async () => {
    const render = jest.fn();
    let resolve!: (value: unknown) => void;
    const pending = new Promise(done => {
      resolve = done;
    });
    startSandbox('race-token', render, { slow: () => pending });
    await sendRun('race-token', 'throw new Error("obsolete code evaluated");', 1, { requiredModules: ['slow'] });
    await sendRun('race-token', 'exports.default = () => null;', 2);
    commit(render);
    resolve({});
    await pending;
    await Promise.resolve();
    await Promise.resolve();
    expect(render).toHaveBeenCalledTimes(1);
    expect(postMessage).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'error', runId: 1 }), '*');
  });

  it('invalidates a pending import immediately and suppresses its eventual failure', async () => {
    const render = jest.fn();
    let reject!: (error: Error) => void;
    const pending = new Promise((_resolve, fail) => {
      reject = fail;
    });
    startSandbox('invalidate-token', render, { slow: () => pending });
    await sendRun('invalidate-token', 'exports.default = () => null;', 1, { requiredModules: ['slow'] });
    await sendRun('invalidate-token', '', 2, { type: 'invalidate' });
    reject(new Error('stale load failed'));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(render).not.toHaveBeenCalled();
    expect(postMessage).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', token: 'invalidate-token' }),
      '*',
    );
  });

  it('accepts updates only from its parent with the matching token and source', async () => {
    const render = jest.fn();
    startSandbox('auth-token', render);
    await sendRun('auth-token', 'exports.default = () => null;', 1, { token: 'wrong' });
    await sendRun('auth-token', 'exports.default = () => null;', 2, { source: 'wrong' });
    window.dispatchEvent(
      new MessageEvent('message', {
        source: null,
        data: {
          source: 'fluentui-playground',
          token: 'auth-token',
          type: 'run',
          runId: 3,
          code: 'exports.default = () => null;',
        },
      }),
    );
    await Promise.resolve();
    expect(render).not.toHaveBeenCalled();
  });
});
