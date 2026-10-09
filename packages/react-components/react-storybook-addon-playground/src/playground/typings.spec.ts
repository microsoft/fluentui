import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

import { enableSemanticValidation, getImportedModules, TypingsLoader } from './typings';

type Monaco = typeof monacoApi;

function createMonaco() {
  let diagnosticsOptions = { noSemanticValidation: true };
  const typescriptDefaults = {
    addExtraLib: jest.fn(),
    getDiagnosticsOptions: jest.fn(() => diagnosticsOptions),
    setDiagnosticsOptions: jest.fn((options: typeof diagnosticsOptions) => {
      diagnosticsOptions = options;
    }),
  };

  return {
    monaco: { languages: { typescript: { typescriptDefaults } } } as unknown as Monaco,
    typescriptDefaults,
  };
}

function createWindow(responses: Record<string, Array<Record<string, string> | Error>>) {
  const fetch = jest.fn(async (url: string) => {
    const response = responses[url].shift();
    if (response instanceof Error) {
      return { ok: false, status: 500, statusText: response.message, json: async () => ({}) };
    }
    return { ok: true, status: 200, statusText: 'OK', json: async () => response };
  });

  return { fetch } as unknown as Window & { fetch: typeof fetch };
}

describe('getImportedModules', () => {
  it('collects static, side-effect, dynamic and require specifiers once', () => {
    const code = `
      import * as React from 'react';
      import { Button } from "@fluentui/react-components";
      import './styles.css';
      export { Icon } from '@fluentui/react-icons';
      const lazy = import('lz-string');
      const legacy = require('@fluentui/react-components');
    `;

    expect(getImportedModules(code)).toEqual([
      'react',
      '@fluentui/react-components',
      './styles.css',
      '@fluentui/react-icons',
      'lz-string',
    ]);
  });
});

describe('enableSemanticValidation', () => {
  it('changes diagnostics options (which restarts the worker) only once', () => {
    const { monaco, typescriptDefaults } = createMonaco();

    enableSemanticValidation(monaco);
    enableSemanticValidation(monaco);

    expect(typescriptDefaults.setDiagnosticsOptions).toHaveBeenCalledTimes(1);
    expect(typescriptDefaults.getDiagnosticsOptions()).toEqual({ noSemanticValidation: false });
  });
});

describe('TypingsLoader', () => {
  it('fetches each file once, registers its declarations and reports the aggregate status', async () => {
    const { monaco, typescriptDefaults } = createMonaco();
    const targetWindow = createWindow({
      'base.json': [{ 'file:///node_modules/react/index.d.ts': 'react' }],
      'icons.json': [{ 'file:///node_modules/icons/index.d.ts': 'icons' }],
    });
    const loader = new TypingsLoader(monaco, targetWindow);
    const listener = jest.fn();
    loader.subscribe(listener);

    const base = loader.load('base.json');
    expect(loader.load('base.json')).toBe(base);
    const icons = loader.load('icons.json');
    expect(loader.getStatus()).toBe('loading');

    await Promise.all([base, icons]);

    expect(loader.getStatus()).toBe('ready');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(targetWindow.fetch).toHaveBeenCalledTimes(2);
    expect(typescriptDefaults.addExtraLib.mock.calls).toEqual([
      ['react', 'file:///node_modules/react/index.d.ts'],
      ['icons', 'file:///node_modules/icons/index.d.ts'],
    ]);
  });

  it('reports failures and retries a failed file on the next request', async () => {
    const { monaco, typescriptDefaults } = createMonaco();
    const targetWindow = createWindow({
      'base.json': [new Error('Server Error'), { 'file:///node_modules/react/index.d.ts': 'react' }],
    });
    const loader = new TypingsLoader(monaco, targetWindow);

    await expect(loader.load('base.json')).rejects.toThrow('500 Server Error');
    expect(loader.getStatus()).toBe('error');

    await loader.load('base.json');
    expect(loader.getStatus()).toBe('ready');
    expect(typescriptDefaults.addExtraLib).toHaveBeenCalledTimes(1);
  });
});
