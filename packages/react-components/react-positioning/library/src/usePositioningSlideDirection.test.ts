import * as React from 'react';
import { getPlacementSlideDirections, usePositioningSlideDirection } from './usePositioningSlideDirection';
import { renderHook, act } from '@testing-library/react';
import type { OnPositioningEndEvent } from './types';

const createMockDocument = (registerProperty = jest.fn()) =>
  ({ defaultView: { CSS: { registerProperty } } } as unknown as Document);

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
        targetDocument: document,
      }),
    );

    const element = document.createElement('div');
    const setPropertySpy = jest.spyOn(element.style, 'setProperty');

    act(() => {
      const event: OnPositioningEndEvent = new CustomEvent('positioningend', {
        detail: { placement: 'bottom', escaped: false, referenceHidden: false },
      });
      Object.defineProperty(event, 'target', { value: element });
      result.current(event);
    });

    // For 'bottom' placement, direction is { x: 0, y: -1 }
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-x', '0px');
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-y', '-1px');
  });

  it('sets CSS custom properties for "right" placement', () => {
    const { result } = renderHook(() =>
      usePositioningSlideDirection({
        targetDocument: document,
      }),
    );

    const element = document.createElement('div');
    const setPropertySpy = jest.spyOn(element.style, 'setProperty');

    act(() => {
      const event: OnPositioningEndEvent = new CustomEvent('positioningend', {
        detail: { placement: 'right-start', escaped: false, referenceHidden: false },
      });
      Object.defineProperty(event, 'target', { value: element });
      result.current(event);
    });

    // For 'right' placement, direction is { x: -1, y: 0 }
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-x', '-1px');
    expect(setPropertySpy).toHaveBeenCalledWith('--fui-positioning-slide-direction-y', '0px');
  });

  it('chains the original onPositioningEnd callback', () => {
    const originalCallback = jest.fn();

    const { result } = renderHook(() =>
      usePositioningSlideDirection({
        targetDocument: document,
        onPositioningEnd: originalCallback,
      }),
    );

    const element = document.createElement('div');

    act(() => {
      const event: OnPositioningEndEvent = new CustomEvent('positioningend', {
        detail: { placement: 'top', escaped: false, referenceHidden: false },
      });
      // CustomEvent doesn't set target automatically, so we dispatch it from element
      Object.defineProperty(event, 'target', { value: element });
      result.current(event);
    });

    expect(originalCallback).toHaveBeenCalledTimes(1);
  });

  it('calls CSS.registerProperty on mount', () => {
    const registerProperty = jest.fn();
    const mockDocument = {
      defaultView: { CSS: { registerProperty } },
    } as unknown as Document;

    renderHook(() =>
      usePositioningSlideDirection({
        targetDocument: mockDocument,
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
    const mockDocument = {
      defaultView: { CSS: { registerProperty } },
    } as unknown as Document;

    // Should not throw
    expect(() => {
      renderHook(() =>
        usePositioningSlideDirection({
          targetDocument: mockDocument,
        }),
      );
    }).not.toThrow();
  });

  it('registers each property once across mounts, rerenders, and remounts', () => {
    const registerProperty = jest.fn();
    const targetDocument = createMockDocument(registerProperty);
    const first = renderHook(() => usePositioningSlideDirection({ targetDocument }));
    first.rerender();
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    first.unmount();
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(2);
  });

  it('registers each property once when StrictMode replays mount effects', () => {
    const registerProperty = jest.fn();
    const targetDocument = createMockDocument(registerProperty);
    let effectRuns = 0;
    renderHook(
      () => {
        React.useEffect(() => {
          effectRuns += 1;
        }, []);
        return usePositioningSlideDirection({ targetDocument });
      },
      { reactStrictMode: true },
    );
    expect(effectRuns).toBe(2);
    expect(registerProperty).toHaveBeenCalledTimes(2);
  });

  it('registers independently in separate windows', () => {
    const firstRegister = jest.fn();
    const secondRegister = jest.fn();
    renderHook(() => usePositioningSlideDirection({ targetDocument: createMockDocument(firstRegister) }));
    renderHook(() => usePositioningSlideDirection({ targetDocument: createMockDocument(secondRegister) }));
    expect(firstRegister).toHaveBeenCalledTimes(2);
    expect(secondRegister).toHaveBeenCalledTimes(2);
  });

  it('registers independently for documents sharing a window proxy', () => {
    const registerProperty = jest.fn();
    const firstDocument = createMockDocument(registerProperty);
    const secondDocument = { defaultView: firstDocument.defaultView } as Document;
    renderHook(() => usePositioningSlideDirection({ targetDocument: firstDocument }));
    renderHook(() => usePositioningSlideDirection({ targetDocument: secondDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(4);
  });

  it('registers in the new document when targetDocument changes', () => {
    const firstRegister = jest.fn();
    const secondRegister = jest.fn();
    const firstDocument = createMockDocument(firstRegister);
    const secondDocument = createMockDocument(secondRegister);
    const { rerender } = renderHook(({ targetDocument }) => usePositioningSlideDirection({ targetDocument }), {
      initialProps: { targetDocument: firstDocument },
    });
    rerender({ targetDocument: secondDocument });
    rerender({ targetDocument: firstDocument });
    expect(firstRegister).toHaveBeenCalledTimes(2);
    expect(secondRegister).toHaveBeenCalledTimes(2);
  });

  it('attempts Y even when X is already registered externally', () => {
    const registerProperty = jest.fn().mockImplementationOnce(() => {
      throw new DOMException('Already registered', 'InvalidModificationError');
    });
    const targetDocument = createMockDocument(registerProperty);
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(2);
    expect(registerProperty).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: '--fui-positioning-slide-direction-y',
      }),
    );
  });

  it('does not repeatedly retry externally registered properties', () => {
    const registerProperty = jest.fn(() => {
      throw new DOMException('Already registered', 'InvalidModificationError');
    });
    const targetDocument = createMockDocument(registerProperty);
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(2);
  });

  it('retries unexpected failures without retrying a successfully registered property', () => {
    const registerProperty = jest.fn().mockImplementationOnce(() => {
      throw new Error('Temporary registration failure');
    });
    const targetDocument = createMockDocument(registerProperty);
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(3);
    expect(registerProperty).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: '--fui-positioning-slide-direction-x',
      }),
    );
  });

  it('handles an absent document or window', () => {
    expect(() => renderHook(() => usePositioningSlideDirection({ targetDocument: undefined }))).not.toThrow();
    expect(() => renderHook(() => usePositioningSlideDirection({ targetDocument: {} as Document }))).not.toThrow();
  });

  it('does not cache an unsupported API and registers when it becomes available', () => {
    const targetDocument = { defaultView: { CSS: {} } } as unknown as Document;
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    const registerProperty = jest.fn();
    targetDocument.defaultView!.CSS.registerProperty = registerProperty;
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(2);
  });

  it('preserves the CSS API receiver', () => {
    const targetDocument = createMockDocument();
    const registerProperty = jest.fn(function (this: unknown) {
      expect(this).toBe(targetDocument.defaultView!.CSS);
    });
    targetDocument.defaultView!.CSS.registerProperty = registerProperty;
    renderHook(() => usePositioningSlideDirection({ targetDocument }));
    expect(registerProperty).toHaveBeenCalledTimes(2);
  });
});
