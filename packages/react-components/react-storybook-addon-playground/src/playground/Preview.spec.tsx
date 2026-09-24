import * as React from 'react';
import { render } from '@testing-library/react';

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
});
