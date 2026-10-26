import * as React from 'react';
import { act, render } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningProps, PositioningReturn } from './types';

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

const PositionedSurface = ({
  options = {},
  version = 0,
  attached = true,
  marker,
}: {
  options?: PositioningProps;
  version?: number;
  attached?: boolean;
  marker?: string;
}) => {
  const { containerRef } = usePositioning(options);
  return (
    <div key={version} ref={attached ? containerRef : undefined} data-testid="surface" data-cover-target={marker} />
  );
};

describe('usePositioning', () => {
  describe('data-cover-target', () => {
    it.each([undefined, false, true])('reflects coverTarget=%s on attachment', coverTarget => {
      const result = mountHook({ coverTarget });
      const node = document.createElement('div');
      node.setAttribute('data-cover-target', 'consumer');

      act(() => result.current.containerRef(node));

      expect(node.getAttribute('data-cover-target')).toBe(coverTarget ? '' : null);
    });

    it('updates the same container through false, true, false and omitted options', () => {
      const { getByTestId, rerender } = render(<PositionedSurface options={{ coverTarget: false }} />);
      const surface = getByTestId('surface');

      expect(surface).not.toHaveAttribute('data-cover-target');
      for (const coverTarget of [true, false, true]) {
        rerender(<PositionedSurface options={{ coverTarget }} />);
        expect(getByTestId('surface')).toBe(surface);
        expect(surface.getAttribute('data-cover-target')).toBe(coverTarget ? '' : null);
      }
      rerender(<PositionedSurface />);
      expect(getByTestId('surface')).toBe(surface);
      expect(surface).not.toHaveAttribute('data-cover-target');
    });

    it.each([false, true])('owns consumer attribute changes while coverTarget stays %s', coverTarget => {
      const { getByTestId, rerender } = render(
        <PositionedSurface options={{ coverTarget }} marker="consumer-initial" />,
      );
      const surface = getByTestId('surface');
      expect(surface.getAttribute('data-cover-target')).toBe(coverTarget ? '' : null);

      rerender(<PositionedSurface options={{ coverTarget }} marker="consumer-updated" />);
      expect(surface.getAttribute('data-cover-target')).toBe(coverTarget ? '' : null);

      rerender(<PositionedSurface options={{ coverTarget }} />);
      expect(surface.getAttribute('data-cover-target')).toBe(coverTarget ? '' : null);
    });

    it('cleans retained nodes on replacement and unmount', () => {
      const { getByTestId, rerender, unmount } = render(<PositionedSurface options={{ coverTarget: true }} />);
      const previous = getByTestId('surface');
      rerender(<PositionedSurface options={{ coverTarget: true }} version={1} />);
      const current = getByTestId('surface');

      expect(current).not.toBe(previous);
      expect(previous).not.toHaveAttribute('data-cover-target');
      expect(current).toHaveAttribute('data-cover-target', '');

      unmount();
      expect(current).not.toHaveAttribute('data-cover-target');
    });

    it('removes the marker when the ref detaches from a retained container', () => {
      const { getByTestId, rerender } = render(<PositionedSurface options={{ coverTarget: true }} />);
      const surface = getByTestId('surface');

      rerender(<PositionedSurface options={{ coverTarget: true }} attached={false} />);
      expect(getByTestId('surface')).toBe(surface);
      expect(surface).not.toHaveAttribute('data-cover-target');

      rerender(<PositionedSurface options={{ coverTarget: true }} />);
      expect(surface).toHaveAttribute('data-cover-target', '');
    });

    it('cleans a directly attached container when the hook unmounts', () => {
      const node = document.createElement('div');
      const Capture = () => {
        const { containerRef } = usePositioning({ coverTarget: true });
        useIsomorphicLayoutEffect(() => containerRef(node), [containerRef]);
        return null;
      };
      const { unmount } = render(<Capture />);
      expect(node).toHaveAttribute('data-cover-target', '');
      unmount();
      expect(node).not.toHaveAttribute('data-cover-target');
    });

    it('preserves the contract through StrictMode effect replay', () => {
      const { getByTestId, unmount } = render(
        <React.StrictMode>
          <PositionedSurface options={{ coverTarget: true }} />
        </React.StrictMode>,
      );
      const surface = getByTestId('surface');
      expect(surface).toHaveAttribute('data-cover-target', '');
      unmount();
      expect(surface).not.toHaveAttribute('data-cover-target');
    });
  });

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
