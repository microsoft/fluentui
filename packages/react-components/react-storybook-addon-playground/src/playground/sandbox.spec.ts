import * as React from 'react';

import type { ResolvedPlaygroundRuntimeManifest } from './runtime';
import { PLAYGROUND_REGISTER_CALLBACK, createSandboxDocument } from './sandbox';

const manifest: ResolvedPlaygroundRuntimeManifest = {
  allowedModules: [],
  baseUrl: 'https://example.com/',
  buildId: 'test',
  scripts: [],
  styles: [],
  typings: 'https://example.com/typings.json',
};

function getBootstrap(token: string): string {
  const documentSource = createSandboxDocument(manifest, token);
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

function startSandbox(token: string, render: jest.Mock, moduleLoaders: Record<string, () => Promise<unknown>> = {}) {
  document.body.innerHTML = '<div id="root"></div>';
  // The production bootstrap is generated JavaScript that must execute inside the iframe global.
  // eslint-disable-next-line no-eval
  window.eval(getBootstrap(token));
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

describe('sandbox bootstrap', () => {
  let postMessage: jest.SpyInstance;

  beforeEach(() => {
    postMessage = jest.spyOn(window.parent, 'postMessage').mockImplementation(() => undefined);
  });

  afterEach(() => {
    postMessage.mockRestore();
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
