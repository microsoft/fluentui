import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './placement';
import type { PositioningProps, PositioningReturn } from './types';

/**
 * Lightweight alternative to `renderHook` (not available across the React 17/18
 * versions matrix we test). Renders a component that calls the hook and exposes
 * its return value via a ref.
 */
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
  it('returns targetRef, containerRef, and arrowRef callbacks', () => {
    const result = mountHook();

    expect(typeof result.current.targetRef).toBe('function');
    expect(typeof result.current.containerRef).toBe('function');
    expect(typeof result.current.arrowRef).toBe('function');
  });

  it('targetRef causes anchor-name to be written to the trigger element', () => {
    const result = mountHook();
    const node = document.createElement('div');
    act(() => {
      result.current.targetRef(node);
    });
    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('containerRef writes data-placement derived from position and align', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');
    result.current.containerRef(node);
    expect(node.getAttribute('data-placement')).toBe('below-start');
  });

  it('containerRef applies position:fixed and position-anchor', () => {
    const result = mountHook();
    const node = document.createElement('div');
    result.current.containerRef(node);
    expect(node.style.position).toBe('fixed');
    expect(node.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
  });
});

describe('getPlacementString', () => {
  it('returns position only for center alignment', () => {
    expect(getPlacementString('above', 'center')).toBe('above');
    expect(getPlacementString('below', 'center')).toBe('below');
  });

  it('returns position-align for non-center alignment', () => {
    expect(getPlacementString('above', 'start')).toBe('above-start');
    expect(getPlacementString('below', 'end')).toBe('below-end');
  });
});
