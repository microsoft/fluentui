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
  const bootstrap = documentSource.match(/<script>([\s\S]*?)<\/script>/)?.[1];
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

async function runSandbox(token: string, code: string, render: jest.Mock) {
  document.body.innerHTML = '<div id="root"></div>';
  // The production bootstrap is generated JavaScript that must execute inside the iframe global.
  // eslint-disable-next-line no-eval
  window.eval(getBootstrap(token));
  const register = (window as unknown as Record<string, (runtime: unknown) => void>)[PLAYGROUND_REGISTER_CALLBACK];
  register(createRuntime(render));

  window.dispatchEvent(
    new MessageEvent('message', {
      source: window.parent,
      data: {
        source: 'fluentui-playground',
        token,
        type: 'run',
        code,
        requiredModules: [],
        runId: 7,
      },
    }),
  );
  await Promise.resolve();
  await Promise.resolve();
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
});
