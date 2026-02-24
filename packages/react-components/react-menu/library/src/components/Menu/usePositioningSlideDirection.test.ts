import { getPlacementSlideDirections, usePositioningSlideDirection } from './usePositioningSlideDirection';
import { renderHook, act } from '@testing-library/react-hooks';

describe('getPlacementSlideDirections', () => {
  it('returns { x: 0, y: 1 } for "top" placement (slides down from top)', () => {
    expect(getPlacementSlideDirections('top')).toEqual({ x: 0, y: 1 });
  });

  it('returns { x: 0, y: 1 } for "top-start" placement', () => {
    expect(getPlacementSlideDirections('top-start')).toEqual({ x: 0, y: 1 });
  });

  it('returns { x: 0, y: 1 } for "top-end" placement', () => {
    expect(getPlacementSlideDirections('top-end')).toEqual({ x: 0, y: 1 });
  });

  it('returns { x: -1, y: 0 } for "right" placement (slides left from right)', () => {
    expect(getPlacementSlideDirections('right')).toEqual({ x: -1, y: 0 });
  });

  it('returns { x: -1, y: 0 } for "right-start" placement', () => {
    expect(getPlacementSlideDirections('right-start')).toEqual({ x: -1, y: 0 });
  });

  it('returns { x: 0, y: -1 } for "bottom" placement (slides up from bottom)', () => {
    expect(getPlacementSlideDirections('bottom')).toEqual({ x: 0, y: -1 });
  });

  it('returns { x: 0, y: -1 } for "bottom-end" placement', () => {
    expect(getPlacementSlideDirections('bottom-end')).toEqual({ x: 0, y: -1 });
  });

  it('returns { x: 1, y: 0 } for "left" placement (slides right from left)', () => {
    expect(getPlacementSlideDirections('left')).toEqual({ x: 1, y: 0 });
  });

  it('returns { x: 1, y: 0 } for "left-end" placement', () => {
    expect(getPlacementSlideDirections('left-end')).toEqual({ x: 1, y: 0 });
  });
});

describe('usePositioningSlideDirection', () => {
  it('sets CSS custom properties on the positioned element', () => {
    const { result } = renderHook(() =>
      usePositioningSlideDirection({
        targetWindow: window,
      }),
    );

    const element = document.createElement('div');
    const setPropertySpy = jest.spyOn(element.style, 'setProperty');

    act(() => {
      const event = new CustomEvent('positioningend', {
        detail: { placement: 'bottom' },
      });
      Object.defineProperty(event, 'target', { value: element });
      result.current(event as any);
    });

    // For 'bottom' placement, direction is { x: 0, y: -1 }
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-x', '0px');
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-y', '-1px');
  });

  it('sets CSS custom properties for "right" placement', () => {
    const { result } = renderHook(() =>
      usePositioningSlideDirection({
        targetWindow: window,
      }),
    );

    const element = document.createElement('div');
    const setPropertySpy = jest.spyOn(element.style, 'setProperty');

    act(() => {
      const event = new CustomEvent('positioningend', {
        detail: { placement: 'right-start' },
      });
      Object.defineProperty(event, 'target', { value: element });
      result.current(event as any);
    });

    // For 'right' placement, direction is { x: -1, y: 0 }
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-x', '-1px');
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-y', '0px');
  });

  it('chains the original onPositioningEnd callback', () => {
    const originalCallback = jest.fn();

    const { result } = renderHook(() =>
      usePositioningSlideDirection({
        targetWindow: window,
        onPositioningEnd: originalCallback,
      }),
    );

    const element = document.createElement('div');

    act(() => {
      const event = new CustomEvent('positioningend', {
        detail: { placement: 'top' },
      });
      // CustomEvent doesn't set target automatically, so we dispatch it from element
      Object.defineProperty(event, 'target', { value: element });
      result.current(event as any);
    });

    expect(originalCallback).toHaveBeenCalledTimes(1);
  });

  it('calls CSS.registerProperty on mount', () => {
    const registerProperty = jest.fn();
    const mockWindow = {
      CSS: { registerProperty },
    } as any;

    renderHook(() =>
      usePositioningSlideDirection({
        targetWindow: mockWindow,
      }),
    );

    expect(registerProperty).toHaveBeenCalledTimes(2);
    expect(registerProperty).toHaveBeenCalledWith({
      name: '--fui-positioning-slide-direction-x',
      syntax: '<length>',
      inherits: false,
      initialValue: '0px',
    });
    expect(registerProperty).toHaveBeenCalledWith({
      name: '--fui-positioning-slide-direction-y',
      syntax: '<length>',
      inherits: false,
      initialValue: '0px',
    });
  });

  it('ignores errors from CSS.registerProperty (already registered)', () => {
    const registerProperty = jest.fn().mockImplementation(() => {
      throw new Error('Property already registered');
    });
    const mockWindow = {
      CSS: { registerProperty },
    } as any;

    // Should not throw
    expect(() => {
      renderHook(() =>
        usePositioningSlideDirection({
          targetWindow: mockWindow,
        }),
      );
    }).not.toThrow();
  });
});
