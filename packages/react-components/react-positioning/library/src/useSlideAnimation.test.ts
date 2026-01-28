import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSlideAnimation } from './useSlideAnimation';
import { DATA_POSITIONING_PLACEMENT, POSITIONING_END_EVENT } from './constants';

// Mock @fluentui/react-motion
jest.mock('@fluentui/react-motion', () => ({
  motionTokens: {
    durationSlower: 300,
    curveDecelerateMid: 'ease-out',
  },
  useAnimateAtoms: () => {
    return jest.fn((element, atoms, options) => ({
      cancel: jest.fn(),
      dispose: jest.fn(),
      finish: jest.fn(),
      pause: jest.fn(),
      play: jest.fn(),
      reverse: jest.fn(),
      isRunning: () => false,
      setMotionEndCallbacks: jest.fn(),
      playbackRate: 1,
    }));
  },
  useIsReducedMotion: () => () => false,
}));

// Mock @fluentui/react-motion-components-preview
jest.mock('@fluentui/react-motion-components-preview', () => ({
  slideAtom: jest.fn(({ direction, duration, easing, outX, outY }) => ({
    keyframes: [{ translate: `${outX} ${outY}` }, { translate: '0px 0px' }],
    duration,
    easing,
  })),
  fadeAtom: jest.fn(({ direction, duration, easing }) => ({
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration,
    easing,
  })),
}));

describe('useSlideAnimation', () => {
  it('returns a callback ref', () => {
    const { result } = renderHook(() => useSlideAnimation());
    expect(typeof result.current).toBe('function');
  });

  it('sets initial opacity to 0 when element is provided', () => {
    const { result } = renderHook(() => useSlideAnimation());
    const element = document.createElement('div');

    act(() => {
      result.current(element);
    });

    expect(element.style.opacity).toBe('0');
  });

  it('listens for positioning end event when placement is not set', () => {
    const { result } = renderHook(() => useSlideAnimation());
    const element = document.createElement('div');
    const addEventListenerSpy = jest.spyOn(element, 'addEventListener');

    act(() => {
      result.current(element);
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(POSITIONING_END_EVENT, expect.any(Function), { once: true });
  });

  it('triggers animation immediately when placement is already set', () => {
    const { result } = renderHook(() => useSlideAnimation());
    const element = document.createElement('div');
    element.setAttribute(DATA_POSITIONING_PLACEMENT, 'top');

    const addEventListenerSpy = jest.spyOn(element, 'addEventListener');

    act(() => {
      result.current(element);
    });

    // Should not add event listener since placement is already set
    expect(addEventListenerSpy).not.toHaveBeenCalledWith(POSITIONING_END_EVENT, expect.any(Function), { once: true });
  });

  it('accepts custom parameters', () => {
    const { result } = renderHook(() =>
      useSlideAnimation({
        distance: '20px',
        duration: 500,
        easing: 'linear',
        animateOpacity: false,
      }),
    );

    expect(typeof result.current).toBe('function');
  });

  it('cleans up when element changes to null', () => {
    const { result } = renderHook(() => useSlideAnimation());
    const element = document.createElement('div');

    act(() => {
      result.current(element);
    });

    // Calling with null should cleanup
    act(() => {
      result.current(null);
    });

    // No error should be thrown
    expect(true).toBe(true);
  });
});
