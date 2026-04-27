import * as React from 'react';
import { act, render } from '@testing-library/react';
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

  it('containerRef writes position-anchor and position-area matching the props', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
    expect(node.style.getPropertyValue('position-area')).toBe('block-end span-inline-end');
  });

  it('containerRef writes position: absolute by default and clears the UA inset/margin defaults', () => {
    const result = mountHook();
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.position).toBe('absolute');
    expect(node.style.inset).toBe('auto');
    expect(node.style.margin).toBe('0px');
  });

  it('containerRef honors strategy: "fixed"', () => {
    const result = mountHook({ strategy: 'fixed' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.position).toBe('fixed');
  });

  it('containerRef writes data-placement matching (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.getAttribute('data-placement')).toBe('below-start');
  });

  it('containerRef sets position-try-fallbacks to the three-try flip chain by default', () => {
    const result = mountHook();
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe(
      'flip-block, flip-inline, flip-block flip-inline',
    );
  });

  it('containerRef uses custom fallbackPositions verbatim when provided', () => {
    const result = mountHook({ fallbackPositions: ['below-start', 'after'] });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('block-end span-inline-end, inline-end');
  });

  it('containerRef removes position-try-fallbacks when pinned', () => {
    const result = mountHook({ pinned: true });
    const node = document.createElement('div');
    node.style.setProperty('position-try-fallbacks', 'flip-block');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('');
  });

  it('containerRef writes cover self-alignment when coverTarget is true', () => {
    const result = mountHook({ coverTarget: true, position: 'above', align: 'start' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('position-area')).toBe('center');
    expect(node.style.getPropertyValue('align-self')).toBe('end');
    expect(node.style.getPropertyValue('justify-self')).toBe('start');
  });

  it('containerRef writes place-self: anchor-center for center alignment (crbug 438334710 workaround)', () => {
    const result = mountHook({ position: 'above', align: 'center' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('place-self')).toBe('anchor-center');
  });

  it('containerRef does not write place-self for non-center alignments', () => {
    const result = mountHook({ position: 'above', align: 'start' });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.getPropertyValue('place-self')).toBe('');
    expect(node.style.getPropertyValue('justify-self')).toBe('');
    expect(node.style.getPropertyValue('align-self')).toBe('');
  });

  it('containerRef writes matchTargetSize width via anchor-size()', () => {
    const result = mountHook({ matchTargetSize: 'width' });
    const node = document.createElement('div');
    const spy = jest.spyOn(node.style, 'setProperty');
    result.current.containerRef(node);

    expect(spy).toHaveBeenCalledWith('width', 'anchor-size(width)');
    spy.mockRestore();
  });

  it('containerRef applies offset as logical margins', () => {
    const result = mountHook({ position: 'below', offset: { mainAxis: 8, crossAxis: 4 } });
    const node = document.createElement('div');
    result.current.containerRef(node);

    expect(node.style.marginBlockStart).toBe('8px');
    expect(node.style.marginInlineStart).toBe('4px');
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
    expect(getPlacementString('before', 'start')).toBe('before-start');
    expect(getPlacementString('after', 'end')).toBe('after-end');
  });
});
