import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import type { CompileResult } from './compiler';
import { compile } from './compiler';
import type { PreviewProps } from './Preview';
import type { ResolvedPlaygroundRuntimeManifest } from './runtime';
import { registerTypings } from './typings';

let mockVersion = 1;
const mockModel = { getVersionId: () => mockVersion };
let mockPreviewProps: PreviewProps;

jest.mock('./compiler', () => ({
  ...jest.requireActual('./compiler'),
  compile: jest.fn(),
}));

jest.mock('./Editor', () => {
  const ReactModule = jest.requireActual<typeof React>('react');
  const MockEditor = (props: {
    file: { language: string; value: string };
    onChange: (value: string) => void;
    onModelReady: (model: object) => void;
  }) => {
    ReactModule.useEffect(() => props.onModelReady(mockModel), [props.onModelReady]);

    return ReactModule.createElement(
      'button',
      {
        type: 'button',
        onClick: () => {
          if (props.file.language === 'typescript') {
            ++mockVersion;
          }
          props.onChange(props.file.language === 'css' ? '.root {' : `${props.file.value}\n// edit`);
        },
      },
      'Edit current file',
    );
  };

  return { TSX_FILE_PATH: 'example.tsx', Editor: MockEditor };
});

jest.mock('./Preview', () => {
  const ReactModule = jest.requireActual<typeof React>('react');
  const MockPreview = (props: PreviewProps) => {
    mockPreviewProps = props;
    ReactModule.useEffect(() => props.onMetadata({ themes: [] }), [props.onMetadata, props.restartId]);

    return ReactModule.createElement('div', { 'data-testid': 'preview', 'data-code': props.code ?? '' });
  };

  return { Preview: MockPreview };
});

jest.mock('./formatter', () => ({
  registerFormatter: () => ({ dispose: jest.fn() }),
}));

jest.mock('./monaco', () => ({ monaco: {} }));

jest.mock('./typings', () => ({
  registerTypings: jest.fn(),
}));

jest.mock('./useMediaQuery', () => ({ useMediaQuery: () => false }));

jest.mock('./useSplitPane', () => ({
  useSplitPane: () => ({ dragging: false, percent: 50, separatorProps: {} }),
}));

const { Playground } = require('./Playground') as {
  Playground: React.ComponentType<{
    initialCode: string | null;
    initialCssModules?: Array<{ name: string; source: string }>;
    manifest: ResolvedPlaygroundRuntimeManifest;
  }>;
};

const manifest: ResolvedPlaygroundRuntimeManifest = {
  allowedModules: [],
  baseUrl: 'https://example.com/',
  buildId: 'test',
  scripts: [],
  styles: [],
  typings: 'https://example.com/typings.json',
};

const compileMock = compile as jest.MockedFunction<typeof compile>;
const registerTypingsMock = registerTypings as jest.MockedFunction<typeof registerTypings>;

function deferredCompile() {
  let resolve!: (result: CompileResult) => void;
  const promise = new Promise<CompileResult>(resolvePromise => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
}

async function flushEffects(): Promise<void> {
  await act(async () => {
    await Promise.resolve();
  });
}

async function runDebouncedCompile(): Promise<void> {
  await act(async () => {
    jest.advanceTimersByTime(400);
    await Promise.resolve();
  });
}

describe('Playground compile transaction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockVersion = 1;
    compileMock.mockReset();
    registerTypingsMock.mockReset().mockResolvedValue(1);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('runs while typings are loading and does not rerun when they arrive', async () => {
    let resolveTypings!: (count: number) => void;
    registerTypingsMock.mockReturnValue(
      new Promise(resolve => {
        resolveTypings = resolve;
      }),
    );
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(<Playground initialCode="export default First;" manifest={manifest} />);
    await flushEffects();
    await runDebouncedCompile();
    expect(compileMock).toHaveBeenCalledTimes(1);
    expect(mockPreviewProps.code).toBe('exports.default = First;');

    await act(async () => resolveTypings(1));
    await runDebouncedCompile();
    expect(compileMock).toHaveBeenCalledTimes(1);
  });

  it('reports a retained preview after a replacement runtime fails', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(<Playground initialCode="export default First;" manifest={manifest} />);
    await flushEffects();
    await runDebouncedCompile();
    act(() => mockPreviewProps.onSuccess(mockPreviewProps.runId));
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await runDebouncedCompile();
    act(() =>
      mockPreviewProps.onError({
        kind: 'runtime',
        message: 'Broken replacement',
        runId: mockPreviewProps.runId,
        previewRetained: true,
      }),
    );
    expect(screen.getByRole('alert').textContent).toContain('Broken replacement');
    expect(screen.getByRole('alert').textContent).toContain('The preview shows the last successful render.');
  });

  it('clears a runtime error when a theme-only update recovers without compiling again', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(<Playground initialCode="export default First;" manifest={manifest} />);
    await flushEffects();
    await runDebouncedCompile();
    fireEvent.click(screen.getByRole('combobox', { name: 'Preview mode' }));
    fireEvent.click(screen.getByRole('option', { name: 'Live update' }));
    await flushEffects();
    await runDebouncedCompile();
    act(() =>
      mockPreviewProps.onMetadata({
        themes: [
          { id: 'light', label: 'Light' },
          { id: 'dark', label: 'Dark' },
        ],
      }),
    );
    act(() =>
      mockPreviewProps.onError({ kind: 'runtime', message: 'Transient failure', runId: mockPreviewProps.runId }),
    );
    expect(screen.getByRole('alert').textContent).toContain('Transient failure');

    const previousRunId = mockPreviewProps.runId;
    fireEvent.click(screen.getByRole('combobox', { name: 'Theme' }));
    fireEvent.click(screen.getByRole('option', { name: 'Dark' }));
    expect(mockPreviewProps.runId).toBeGreaterThan(previousRunId);
    act(() => mockPreviewProps.onSuccess(mockPreviewProps.runId));
    expect(compileMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('Ready')).toBeTruthy();
  });

  it('retains the last successful preview when a CSS compile fails', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(
      <Playground
        initialCode="export default First;"
        initialCssModules={[{ name: 'styles.module.css', source: '.root {}' }]}
        manifest={manifest}
      />,
    );

    await flushEffects();
    await runDebouncedCompile();
    expect(screen.getByTestId('preview').getAttribute('data-code')).toBe('exports.default = First;');
    const successfulCssModules = mockPreviewProps.cssModules;

    act(() => mockPreviewProps.onSuccess(mockPreviewProps.runId));
    expect(screen.getByText('Ready')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'styles.module.css' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await runDebouncedCompile();

    expect(screen.getByTestId('preview').getAttribute('data-code')).toBe('exports.default = First;');
    expect(mockPreviewProps.cssModules).toBe(successfulCssModules);
    expect(screen.getByRole('alert').textContent).toContain('CSS syntax error');
    expect(screen.getByRole('alert').textContent).toContain('The preview shows the last successful render.');
  });

  it('does not claim the last successful preview is retained after runtime errors', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = Current;', diagnostics: [] });
    render(
      <Playground
        initialCode="export default Current;"
        initialCssModules={[{ name: 'styles.module.css', source: '.root {}' }]}
        manifest={manifest}
      />,
    );

    await flushEffects();
    await runDebouncedCompile();
    act(() => mockPreviewProps.onSuccess(mockPreviewProps.runId));

    act(() => mockPreviewProps.onError({ kind: 'runtime', message: 'Boom', runId: mockPreviewProps.runId }));

    expect(screen.getByRole('alert').textContent).toContain('Boom');
    expect(screen.getByRole('alert').textContent).not.toContain('The preview shows the last successful render.');

    fireEvent.click(screen.getByRole('tab', { name: 'styles.module.css' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await runDebouncedCompile();

    expect(screen.getByRole('alert').textContent).toContain('CSS syntax error');
    expect(screen.getByRole('alert').textContent).not.toContain('The preview shows the last successful render.');
  });

  it('ignores a stale compile that resolves after a newer run', async () => {
    const stale = deferredCompile();
    const current = deferredCompile();
    compileMock.mockReturnValueOnce(stale.promise).mockReturnValueOnce(current.promise);
    render(<Playground initialCode="export default First;" manifest={manifest} />);

    await flushEffects();
    await runDebouncedCompile();
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await runDebouncedCompile();

    await act(async () => current.resolve({ code: 'exports.default = Current;', diagnostics: [] }));
    expect(screen.getByTestId('preview').getAttribute('data-code')).toBe('exports.default = Current;');

    await act(async () => stale.resolve({ code: 'exports.default = Stale;', diagnostics: [] }));
    expect(screen.getByTestId('preview').getAttribute('data-code')).toBe('exports.default = Current;');
  });

  it('invalidates an in-flight emit as soon as an edit arrives, before the next debounce', async () => {
    const pending = deferredCompile();
    compileMock.mockReturnValue(pending.promise);
    render(<Playground initialCode="export default First;" manifest={manifest} />);
    await flushEffects();
    await runDebouncedCompile();
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    expect(mockPreviewProps.paused).toBe(true);
    await act(async () => pending.resolve({ code: 'exports.default = Stale;', diagnostics: [] }));
    expect(mockPreviewProps.code).toBeNull();
  });

  it('reuses the TS emit for CSS edits and explicit runs without suppressing the run', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(
      <Playground
        initialCode="export default First;"
        initialCssModules={[{ name: 'styles.module.css', source: '.root {}' }]}
        manifest={manifest}
      />,
    );
    await flushEffects();
    await runDebouncedCompile();
    const firstRunId = mockPreviewProps.runId;
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    await flushEffects();
    expect(compileMock).toHaveBeenCalledTimes(1);
    expect(mockPreviewProps.runId).toBeGreaterThan(firstRunId);
    expect(mockPreviewProps.preserveState).toBe(false);

    fireEvent.click(screen.getByRole('tab', { name: 'styles.module.css' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await runDebouncedCompile();
    expect(compileMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('alert').textContent).toContain('CSS syntax error');
  });

  it('keeps isolated mode as the default and opts into a shorter live-update debounce', async () => {
    compileMock.mockResolvedValue({ code: 'exports.default = First;', diagnostics: [] });
    render(<Playground initialCode="export default First;" manifest={manifest} />);
    await flushEffects();
    await runDebouncedCompile();
    expect(mockPreviewProps.liveUpdate).toBe(false);

    fireEvent.click(screen.getByRole('combobox', { name: 'Preview mode' }));
    fireEvent.click(screen.getByRole('option', { name: 'Live update' }));
    await flushEffects();
    expect(mockPreviewProps.liveUpdate).toBe(true);
    expect(mockPreviewProps.restartId).toBe(1);
    await act(async () => jest.advanceTimersByTime(150));
    fireEvent.click(screen.getByRole('button', { name: 'Edit current file' }));
    await act(async () => jest.advanceTimersByTime(149));
    expect(compileMock).toHaveBeenCalledTimes(1);
    await act(async () => jest.advanceTimersByTime(1));
    expect(compileMock).toHaveBeenCalledTimes(2);
    expect(mockPreviewProps.preserveState).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Restart preview' }));
    expect(mockPreviewProps.restartId).toBe(2);
    expect(mockPreviewProps.code).toBeNull();
    await flushEffects();
    await act(async () => jest.advanceTimersByTime(150));
    expect(mockPreviewProps.code).toBe('exports.default = First;');
    expect(compileMock).toHaveBeenCalledTimes(2);
  });
});
