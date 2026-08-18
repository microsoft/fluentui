import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getDefaultFallbackPositions, getLogicalPlacement, getPlacementString } from './utils/placement';
import type { PositioningProps, PositioningReturn } from './types';
import type { PositioningReturnInternal } from './internalTypes';
import type { FallbackPositioningRuntime } from './fallbackPositioningRuntime';
import { setPositioningRuntimeOverrideForTests } from './anchorPositioningCapabilities';
import { resetPositioningRuntimeForTests, setFallbackPositioningLoaderForTests } from './positioningRuntime';

function mountHook(options: PositioningProps = {}) {
  const resultRef = React.createRef<{ current: PositioningReturn }>();
  const Capture = () => {
    const result = usePositioning(options);
    (resultRef as unknown as { current: PositioningReturn }).current = result;
    return null;
  };
  render(<Capture />);
  return resultRef as unknown as { current: PositioningReturn };
}

describe('usePositioning', () => {
  it('returns targetRef and containerRef callbacks', () => {
    const result = mountHook();

    expect(typeof result.current.targetRef).toBe('function');
    expect(typeof result.current.containerRef).toBe('function');
  });

  it('targetRef writes anchor-name onto the trigger element', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.targetRef(node);
    });

    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('appends to anchor-name so multiple instances can share one trigger', () => {
    // Two popovers (e.g. a Tooltip and a Menu) attached to the same trigger.
    const first = mountHook();
    const second = mountHook();
    const node = document.createElement('div');

    act(() => {
      first.current.targetRef(node);
      second.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim())
      .filter(Boolean);

    // Both instances contribute their own anchor name; neither clobbers the other.
    expect(names).toHaveLength(2);
    expect(names[0]).not.toBe(names[1]);
    names.forEach(name => expect(name).toMatch(/^--popover-anchor-/));
  });

  it('preserves a pre-existing author-set anchor-name', () => {
    const result = mountHook();
    const node = document.createElement('div');
    node.style.setProperty('anchor-name', '--app-anchor');

    act(() => {
      result.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim());

    expect(names).toContain('--app-anchor');
    expect(names.some(name => /^--popover-anchor-/.test(name))).toBe(true);
  });

  it('containerRef writes position-anchor and position-area matching the props', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
    expect(node).toHaveStyle({ positionArea: 'block-end span-inline-end' });
  });

  it('containerRef writes position: absolute by default and clears the UA inset/margin defaults', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'fixed', inset: 'auto', margin: '0px' });
  });

  it('containerRef honors strategy: "absolute"', () => {
    const result = mountHook({ strategy: 'absolute' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'absolute' });
  });

  it('containerRef writes data-placement matching (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveAttribute('data-placement', 'below-start');
  });

  it('containerRef sets position-try-fallbacks to the default flip chain', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline' });
  });

  it('containerRef uses custom fallbackPositions verbatim when provided', () => {
    const result = mountHook({ fallbackPositions: ['below-start', 'after'] });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'block-end span-inline-end, inline-end' });
  });

  it('containerRef removes position-try-fallbacks when pinned', () => {
    const result = mountHook({ pinned: true });
    const node = document.createElement('div');
    node.style.setProperty('position-try-fallbacks', 'flip-block');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('');
  });

  it('containerRef writes cover self-alignment when coverTarget is true', () => {
    const result = mountHook({ coverTarget: true, position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionArea: 'center', alignSelf: 'end', justifySelf: 'start' });
  });

  it('containerRef writes place-self: anchor-center for center alignment (crbug 438334710 workaround)', () => {
    const result = mountHook({ position: 'above', align: 'center' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ placeSelf: 'anchor-center' });
  });

  it('containerRef does not write place-self for non-center alignments', () => {
    const result = mountHook({ position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('place-self')).toBe('');
    expect(node.style.getPropertyValue('justify-self')).toBe('');
    expect(node.style.getPropertyValue('align-self')).toBe('');
  });

  it('containerRef writes matchTargetSize width via anchor-size()', () => {
    const result = mountHook({ matchTargetSize: 'width' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ width: 'anchor-size(width)' });
  });

  it('containerRef applies offset as symmetric logical margins so flips keep their gap', () => {
    const result = mountHook({ position: 'below', offset: { mainAxis: 8, crossAxis: 4 } });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({
      marginBlockStart: '8px',
      marginBlockEnd: '8px',
      marginInlineStart: '4px',
      marginInlineEnd: '4px',
    });
  });

  describe('imperative ref', () => {
    it('exposes a callable updatePosition()', () => {
      const positioningRef = React.createRef<{
        updatePosition: () => void;
        setTarget: (el: HTMLElement | null) => void;
      }>();
      mountHook({
        positioningRef: positioningRef as unknown as PositioningProps['positioningRef'],
      });

      expect(positioningRef.current).not.toBeNull();
      expect(() => positioningRef.current?.updatePosition()).not.toThrow();
    });
  });
});

describe('getPlacementString', () => {
  it('returns the bare position for center alignment', () => {
    expect(getPlacementString('above', 'center')).toBe('above');
    expect(getPlacementString('below', 'center')).toBe('below');
  });

  it('returns position-align for non-center alignments', () => {
    expect(getPlacementString('above', 'start')).toBe('above-start');
    expect(getPlacementString('below', 'end')).toBe('below-end');
    expect(getPlacementString('before', 'start')).toBe('before-top');
    expect(getPlacementString('after', 'end')).toBe('after-bottom');
  });
});

describe('native fallback placement mapping', () => {
  it('maps default block and inline flip tactics in order', () => {
    expect(getDefaultFallbackPositions('above', 'start')).toEqual(['below-start', 'above-end', 'below-end']);
    expect(getDefaultFallbackPositions('before', 'start')).toEqual(['before-bottom', 'after-top', 'after-bottom']);
  });

  it('omits duplicate no-op flips for centered placements', () => {
    expect(getDefaultFallbackPositions('above', 'center')).toEqual(['below']);
    expect(getDefaultFallbackPositions('before', 'center')).toEqual(['after']);
  });

  it('maps physical placement back to logical placement including RTL', () => {
    expect(getLogicalPlacement('top-start', 'ltr')).toBe('above-start');
    expect(getLogicalPlacement('right-end', 'ltr')).toBe('after-bottom');
    expect(getLogicalPlacement('right-end', 'rtl')).toBe('before-bottom');
    expect(getLogicalPlacement('left-start', 'rtl')).toBe('after-top');
  });
});

describe('fallback positioning backend', () => {
  beforeEach(() => {
    resetPositioningRuntimeForTests();
    setPositioningRuntimeOverrideForTests(document, 'fallback');
  });

  afterEach(() => {
    resetPositioningRuntimeForTests();
    setPositioningRuntimeOverrideForTests(document, 'native');
  });

  it('loads the manager with native-normalized behavior and preserves the native Popover element', async () => {
    const manager = {
      dispose: jest.fn(),
      updatePosition: jest.fn(),
    };
    type ManagerOptions = Parameters<FallbackPositioningRuntime['createPositioningManager']>[0];
    const createPositioningManager = jest.fn((_options: ManagerOptions) => manager);
    const fallbackRuntime = {
      createPositioningManager,
    } as unknown as FallbackPositioningRuntime;
    setFallbackPositioningLoaderForTests(() =>
      Promise.resolve({
        fallbackPositioningRuntime: fallbackRuntime,
      } as typeof import('./fallbackPositioningRuntime')),
    );

    const positioningRef = React.createRef<{
      setTarget: (target: HTMLElement | null) => void;
      updatePosition: () => void;
    }>();
    let result: PositioningReturnInternal | undefined;
    const Capture = () => {
      result = usePositioning({
        align: 'start',
        matchTargetSize: 'width',
        position: 'above',
        positioningRef: positioningRef as PositioningProps['positioningRef'],
      }) as PositioningReturnInternal;
      return null;
    };

    const { unmount } = render(<Capture />);
    const target = document.createElement('button');
    const container = document.createElement('dialog');
    const arrow = document.createElement('div');
    container.setAttribute('popover', 'auto');
    container.style.width = '320px';

    act(() => {
      result?.targetRef(target);
      result?.containerRef(container);
      result?.arrowRef(arrow);
    });

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(container).toHaveAttribute('popover', 'auto');
    expect(createPositioningManager).toHaveBeenCalledWith(
      expect.objectContaining({
        align: 'start',
        arrow,
        container,
        fallbackPositions: ['below-start', 'above-end', 'below-end'],
        matchTargetSize: 'width',
        position: 'above',
        strategy: 'fixed',
        target,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unstable_disableShift: true,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        unstable_flipFallbackStrategy: 'initialPlacement',
        useTransform: false,
      }),
    );

    const managerOptions = createPositioningManager.mock.calls[0][0];
    managerOptions.onPositioningEnd?.(
      new CustomEvent('fui-positioningend', {
        detail: {
          escaped: false,
          placement: 'right-end',
          referenceHidden: false,
        },
      }),
    );

    expect(container).toHaveAttribute('data-placement', 'after-bottom');
    expect(container).toHaveAttribute('data-positioning-runtime', 'fallback');
    expect(container.style.visibility).toBe('');
    expect(container.style.width).toBe('');

    positioningRef.current?.updatePosition();
    expect(manager.updatePosition).toHaveBeenCalledTimes(1);

    unmount();
    expect(manager.dispose).toHaveBeenCalledTimes(1);
    expect(container).toHaveAttribute('popover', 'auto');
    expect(container.style.width).toBe('320px');
  });
});
