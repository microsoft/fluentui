import * as React from 'react';
import { act, render } from '@testing-library/react';

import { setOverlayRuntimeOverrideForTests } from './nativeCapabilities';
import type { OverlayFallbackRuntime } from './fallbackRuntime';
import {
  getOverlayRuntimeSnapshot,
  resetOverlayRuntimeForTests,
  setOverlayFallbackLoaderForTests,
  useOverlayRuntime,
} from './overlayRuntime';

const fallbackRuntime = { positioning: {} } as unknown as OverlayFallbackRuntime;

describe('overlay runtime', () => {
  beforeEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'fallback');
  });

  afterEach(() => {
    resetOverlayRuntimeForTests();
    setOverlayRuntimeOverrideForTests(document, 'auto');
  });

  it('loads one shared fallback runtime when the first overlay mounts', async () => {
    let resolveRuntime:
      | ((module: typeof import('./fallbackRuntime')) => void)
      | undefined;
    const loader = jest.fn(
      () =>
        new Promise<typeof import('./fallbackRuntime')>(resolve => {
          resolveRuntime = resolve;
        }),
    );
    setOverlayFallbackLoaderForTests(loader);

    const snapshots: string[] = [];
    const TestOverlay = () => {
      const snapshot = useOverlayRuntime(document);
      snapshots.push(snapshot.mode);
      return null;
    };

    render(
      <>
        <TestOverlay />
        <TestOverlay />
      </>,
    );

    expect(loader).toHaveBeenCalledTimes(1);
    expect(getOverlayRuntimeSnapshot(document).mode).toBe('fallback-loading');

    await act(async () => {
      resolveRuntime?.({
        fallbackRuntime,
      } as typeof import('./fallbackRuntime'));
      await Promise.resolve();
    });

    expect(getOverlayRuntimeSnapshot(document)).toEqual({ mode: 'fallback-ready', runtime: fallbackRuntime });
    expect(snapshots).toContain('fallback-ready');
  });

  it('does not load fallback code in native mode', () => {
    setOverlayRuntimeOverrideForTests(document, 'native');
    const loader = jest.fn();
    setOverlayFallbackLoaderForTests(loader);

    const TestOverlay = () => {
      useOverlayRuntime(document);
      return null;
    };

    render(<TestOverlay />);

    expect(loader).not.toHaveBeenCalled();
    expect(getOverlayRuntimeSnapshot(document).mode).toBe('native');
  });

  it('retains an explicit fallback loading error', async () => {
    const error = new Error('chunk failed');
    setOverlayFallbackLoaderForTests(() => Promise.reject(error));

    const TestOverlay = () => {
      useOverlayRuntime(document);
      return null;
    };

    render(<TestOverlay />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(getOverlayRuntimeSnapshot(document)).toEqual({ mode: 'fallback-error', error });
  });
});
