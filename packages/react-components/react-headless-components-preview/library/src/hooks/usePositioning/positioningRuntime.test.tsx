import * as React from 'react';
import { act, render } from '@testing-library/react';

import type { FallbackPositioningRuntime } from './fallbackPositioningRuntime';
import { setPositioningRuntimeOverrideForTests } from './anchorPositioningCapabilities';
import {
  getPositioningRuntimeSnapshot,
  resetPositioningRuntimeForTests,
  setFallbackPositioningLoaderForTests,
  usePositioningRuntime,
} from './positioningRuntime';

const fallbackRuntime = {
  createPositioningManager: jest.fn(),
} as unknown as FallbackPositioningRuntime;

const createTargetDocument = (supportsAnchors: boolean): Document =>
  ({
    defaultView: {
      CSS: {
        supports: () => supportsAnchors,
      },
    },
  } as unknown as Document);

describe('positioningRuntime', () => {
  beforeEach(() => {
    resetPositioningRuntimeForTests();
    setPositioningRuntimeOverrideForTests(document, 'fallback');
  });

  afterEach(() => {
    resetPositioningRuntimeForTests();
    setPositioningRuntimeOverrideForTests(document, 'auto');
  });

  it('hydrates with the SSR/native backend before settling on native positioning in auto mode', () => {
    const targetDocument = createTargetDocument(true);
    const loader = jest.fn();
    const modes: string[] = [];
    setFallbackPositioningLoaderForTests(loader);

    const TestPositioning = () => {
      modes.push(usePositioningRuntime(targetDocument).mode);
      return null;
    };

    render(<TestPositioning />);

    expect(modes[0]).toBe('ssr');
    expect(modes[modes.length - 1]).toBe('native');
    expect(loader).not.toHaveBeenCalled();
  });

  it('hydrates with the SSR/native backend before loading fallback positioning in auto mode', () => {
    const targetDocument = createTargetDocument(false);
    const loader = jest.fn(
      () =>
        new Promise<typeof import('./fallbackPositioningRuntime')>(() => {
          // Deliberately left pending to verify the loading snapshot.
        }),
    );
    const modes: string[] = [];
    setFallbackPositioningLoaderForTests(loader);

    const TestPositioning = () => {
      modes.push(usePositioningRuntime(targetDocument).mode);
      return null;
    };

    render(<TestPositioning />);

    expect(modes[0]).toBe('ssr');
    expect(modes[modes.length - 1]).toBe('fallback-loading');
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('loads one shared fallback runtime when the first positioned component mounts', async () => {
    let resolveRuntime: ((module: typeof import('./fallbackPositioningRuntime')) => void) | undefined;
    const loader = jest.fn(
      () =>
        new Promise<typeof import('./fallbackPositioningRuntime')>(resolve => {
          resolveRuntime = resolve;
        }),
    );
    setFallbackPositioningLoaderForTests(loader);

    const TestPositioning = () => {
      usePositioningRuntime(document);
      return null;
    };

    render(
      <>
        <TestPositioning />
        <TestPositioning />
      </>,
    );

    expect(loader).toHaveBeenCalledTimes(1);
    expect(getPositioningRuntimeSnapshot(document).mode).toBe('fallback-loading');

    await act(async () => {
      resolveRuntime?.({
        fallbackPositioningRuntime: fallbackRuntime,
      } as typeof import('./fallbackPositioningRuntime'));
      await Promise.resolve();
    });

    expect(getPositioningRuntimeSnapshot(document)).toEqual({
      mode: 'fallback-ready',
      runtime: fallbackRuntime,
    });
  });

  it('does not load fallback code in native mode', () => {
    setPositioningRuntimeOverrideForTests(document, 'native');
    const loader = jest.fn();
    setFallbackPositioningLoaderForTests(loader);

    const TestPositioning = () => {
      usePositioningRuntime(document);
      return null;
    };

    render(<TestPositioning />);

    expect(loader).not.toHaveBeenCalled();
    expect(getPositioningRuntimeSnapshot(document).mode).toBe('native');
  });

  it('does not load fallback code during server rendering', () => {
    const loader = jest.fn();
    setFallbackPositioningLoaderForTests(loader);

    expect(getPositioningRuntimeSnapshot(undefined)).toEqual({ mode: 'ssr' });
    expect(loader).not.toHaveBeenCalled();
  });

  it('retains a fallback loading error', async () => {
    const error = new Error('chunk failed');
    setFallbackPositioningLoaderForTests(() => Promise.reject(error));

    const TestPositioning = () => {
      usePositioningRuntime(document);
      return null;
    };
    render(<TestPositioning />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(getPositioningRuntimeSnapshot(document)).toEqual({
      error,
      mode: 'fallback-error',
    });
  });
});
