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

describe('Preview sandbox permissions', () => {
  it('keeps evaluated user code in an opaque-origin iframe', () => {
    expect(PREVIEW_SANDBOX.split(/\s+/)).toEqual(['allow-scripts']);
    expect(PREVIEW_SANDBOX.split(/\s+/)).not.toContain('allow-same-origin');
  });

  it('creates a new sandbox iframe for every run', () => {
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

    expect(container.querySelector('iframe')).not.toBe(firstFrame);
  });

  it('keeps the successful frame visible while a replacement renders, then disposes it', () => {
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

    rerender(<Preview {...props} runId={2} />);
    const pending = container.querySelectorAll('iframe')[1];
    expect(firstFrame.isConnected).toBe(true);
    expect(firstFrame.getAttribute('aria-hidden')).toBeNull();
    expect(pending.getAttribute('aria-hidden')).toBe('true');
    expect(pending.tabIndex).toBe(-1);
    expect(pending.sandbox).toBe(firstFrame.sandbox);

    sendMessage(pending, { type: 'success', runId: 2 });
    expect(firstFrame.isConnected).toBe(false);
    expect(container.querySelector('iframe')).toBe(pending);
    expect(pending.getAttribute('aria-hidden')).toBeNull();
    expect(props.onSuccess).toHaveBeenLastCalledWith(2);
  });

  it('retains the successful frame on replacement errors and ignores superseded frames', () => {
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
    rerender(<Preview {...props} runId={2} />);
    const stale = container.querySelectorAll('iframe')[1];
    rerender(<Preview {...props} runId={3} />);
    const pending = container.querySelectorAll('iframe')[1];
    expect(stale.isConnected).toBe(false);
    sendMessage(firstFrame, { type: 'success', runId: 1 });
    sendMessage(pending, { type: 'success', runId: 2 });
    expect(props.onSuccess).toHaveBeenCalledTimes(1);

    sendMessage(pending, { type: 'error', runId: 3, kind: 'runtime', message: 'Broken' });
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(container.querySelector('iframe')).toBe(firstFrame);
    expect(props.onError).toHaveBeenCalledWith(expect.objectContaining({ runId: 3, previewRetained: true }));

    rerender(<Preview {...props} runId={4} />);
    const recovery = container.querySelectorAll('iframe')[1];
    sendMessage(recovery, { type: 'success', runId: 4 });
    expect(container.querySelector('iframe')).toBe(recovery);
    expect(firstFrame.isConnected).toBe(false);
  });
});
