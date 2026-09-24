import * as React from 'react';
import { act, render } from '@testing-library/react';

import { PREVIEW_SANDBOX } from './Preview';
import { Preview } from './Preview';
import type { ResolvedPlaygroundRuntimeManifest } from './runtime';

const manifest: ResolvedPlaygroundRuntimeManifest = {
  allowedModules: [],
  baseUrl: 'https://example.com/',
  buildId: 'test',
  scripts: [],
  styles: [],
  typings: 'https://example.com/typings.json',
};

function sendMessage(frame: HTMLIFrameElement, message: Record<string, unknown>) {
  const token = JSON.parse(frame.srcdoc.match(/const token = ("[^"]+");/)![1]);
  act(() => {
    frame.ownerDocument.defaultView!.dispatchEvent(
      new MessageEvent('message', {
        source: frame.contentWindow,
        data: { source: 'fluentui-playground', token, ...message },
      }),
    );
  });
}

describe('Preview sandbox', () => {
  it('keeps evaluated user code in an opaque-origin iframe', () => {
    expect(PREVIEW_SANDBOX.split(/\s+/)).toEqual(['allow-scripts']);
    expect(PREVIEW_SANDBOX.split(/\s+/)).not.toContain('allow-same-origin');
  });

  it('reuses one visible sandbox iframe across runs without an opt-in', () => {
    const props = {
      code: 'exports.default = () => null;',
      runId: 1,
      manifest,
      onMetadata: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
    const { container, rerender } = render(<Preview {...props} />);
    const firstFrame = container.querySelector('iframe');

    rerender(<Preview {...props} runId={2} />);

    expect(container.querySelector('iframe')).toBe(firstFrame);
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(firstFrame?.getAttribute('aria-hidden')).toBeNull();
  });

  it('disposes the old sandbox immediately on restart while the current source is compiling', () => {
    const props = {
      code: 'exports.default = () => null;',
      runId: 1,
      manifest,
      onMetadata: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
    const { container, rerender } = render(<Preview {...props} />);
    const firstFrame = container.querySelector('iframe')!;
    sendMessage(firstFrame, { type: 'success', runId: 1 });

    rerender(<Preview {...props} runId={2} restartId={1} code={null} placeholder="Preparing preview" />);
    const restarted = container.querySelector('iframe')!;
    expect(firstFrame.isConnected).toBe(false);
    expect(restarted).not.toBe(firstFrame);
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(container.textContent).toContain('Preparing preview');
    expect(restarted.sandbox).toBe(firstFrame.sandbox);

    sendMessage(firstFrame, { type: 'success', runId: 2 });
    sendMessage(firstFrame, { type: 'error', runId: 2, kind: 'runtime', message: 'obsolete' });
    expect(props.onSuccess).toHaveBeenCalledTimes(1);
    expect(props.onError).not.toHaveBeenCalled();

    rerender(<Preview {...props} runId={2} restartId={1} />);
    expect(container.querySelector('iframe')).toBe(restarted);
    sendMessage(restarted, { type: 'success', runId: 2 });
    expect(props.onSuccess).toHaveBeenLastCalledWith(2);
  });

  it('forwards current error retention, ignores stale runs and recovers in the same iframe', () => {
    const props = {
      code: 'exports.default = () => null;',
      runId: 1,
      manifest,
      onMetadata: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
    const { container, rerender } = render(<Preview {...props} />);
    const frame = container.querySelector('iframe')!;
    sendMessage(frame, { type: 'success', runId: 1 });
    rerender(<Preview {...props} runId={2} />);
    rerender(<Preview {...props} runId={3} />);
    sendMessage(frame, { type: 'success', runId: 1 });
    sendMessage(frame, { type: 'error', runId: 2, kind: 'runtime', message: 'obsolete' });
    expect(props.onSuccess).toHaveBeenCalledTimes(1);
    expect(props.onError).not.toHaveBeenCalled();

    sendMessage(frame, { type: 'error', runId: 3, kind: 'runtime', message: 'Broken', previewRetained: true });
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(container.querySelector('iframe')).toBe(frame);
    expect(props.onError).toHaveBeenCalledWith(expect.objectContaining({ runId: 3, previewRetained: true }));

    rerender(<Preview {...props} runId={4} />);
    sendMessage(frame, { type: 'error', runId: 4, kind: 'runtime', message: 'Render failed', previewRetained: false });
    expect(props.onError).toHaveBeenLastCalledWith(expect.objectContaining({ runId: 4, previewRetained: false }));

    rerender(<Preview {...props} runId={5} />);
    sendMessage(frame, { type: 'success', runId: 5 });
    expect(container.querySelector('iframe')).toBe(frame);
    expect(props.onSuccess).toHaveBeenLastCalledWith(5);
  });

  it('posts each run only once and recreates the iframe for restart or runtime build changes', () => {
    const props = {
      code: 'exports.default = () => null;',
      runId: 1,
      restartId: 0,
      manifest,
      onMetadata: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
    const { container, rerender } = render(<Preview {...props} />);
    const first = container.querySelector('iframe')!;
    const post = jest.spyOn(first.contentWindow!, 'postMessage');
    sendMessage(first, { type: 'ready', metadata: { themes: [] } });
    expect(post).toHaveBeenCalledTimes(1);
    sendMessage(first, { type: 'success', runId: 1 });
    expect(post).toHaveBeenCalledTimes(1);

    rerender(<Preview {...props} runId={2} preserveState />);
    expect(container.querySelector('iframe')).toBe(first);
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'run', runId: 2, preserveState: true }), '*');
    sendMessage(first, { type: 'error', runId: 2, kind: 'runtime', message: 'Oops', previewRetained: true });
    expect(props.onError).toHaveBeenCalledWith(expect.objectContaining({ previewRetained: true }));
    expect(container.querySelector('iframe')).toBe(first);

    rerender(<Preview {...props} runId={3} restartId={1} />);
    const restarted = container.querySelector('iframe');
    expect(restarted).not.toBe(first);
    rerender(<Preview {...props} runId={4} restartId={1} manifest={{ ...manifest, buildId: 'next-build' }} />);
    expect(container.querySelector('iframe')).not.toBe(restarted);
    post.mockRestore();
  });

  it('invalidates pending live imports on edits and ignores their responses', () => {
    const props = {
      code: 'exports.default = () => null;',
      runId: 1,
      manifest,
      onMetadata: jest.fn(),
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
    const { container, rerender } = render(<Preview {...props} />);
    const frame = container.querySelector('iframe')!;
    const post = jest.spyOn(frame.contentWindow!, 'postMessage');
    sendMessage(frame, { type: 'ready', metadata: { themes: [] } });
    rerender(<Preview {...props} paused />);
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'invalidate' }), '*');
    sendMessage(frame, { type: 'success', runId: 1 });
    sendMessage(frame, { type: 'error', runId: 1, kind: 'runtime', message: 'stale' });
    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(props.onError).not.toHaveBeenCalled();
    rerender(<Preview {...props} runId={2} />);
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'run', runId: 2 }), '*');
    post.mockRestore();
  });
});
