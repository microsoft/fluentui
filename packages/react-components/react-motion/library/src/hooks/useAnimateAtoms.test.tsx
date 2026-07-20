import { renderHook } from '@testing-library/react-hooks';

import type { AtomMotion } from '../types';
import { DEFAULT_ANIMATION_OPTIONS, useAnimateAtoms } from './useAnimateAtoms';

function createElementMock() {
  const animate = jest.fn().mockReturnValue({
    persist: jest.fn(),
  });

  return [{ animate } as unknown as HTMLElement, animate] as const;
}

function createNullElementMock() {
  const animate = jest.fn().mockReturnValue(null);

  return [{ animate } as unknown as HTMLElement, animate] as const;
}

function createErrorElementMock() {
  const animate = jest.fn().mockImplementation(() => {
    throw new Error('Animation error');
  });

  return [{ animate } as unknown as HTMLElement, animate] as const;
}

const DEFAULT_KEYFRAMES = [{ transform: 'rotate(0)' }, { transform: 'rotate(180deg)' }];
const REDUCED_MOTION_KEYFRAMES = [{ opacity: 0 }, { opacity: 1 }];

describe('useAnimateAtoms', () => {
  beforeEach(() => {
    // We set production environment to avoid testing the mock implementation
    process.env.NODE_ENV = 'production';
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useAnimateAtoms());

    expect(result.current).toBeInstanceOf(Function);
  });

  it('finishes immediately when callbacks are armed after the animation finished', () => {
    jest.useFakeTimers();
    const animation = {
      persist: jest.fn(),
      playState: 'finished',
    } as unknown as Animation;
    const element = { animate: jest.fn().mockReturnValue(animation) } as unknown as HTMLElement;
    const onfinish = jest.fn();
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });

    handle.setMotionEndCallbacks(onfinish, jest.fn());

    expect(onfinish).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
  });

  it('counts animations that finished before callbacks were armed', () => {
    const animations = [
      { persist: jest.fn(), playState: 'finished' },
      { persist: jest.fn(), playState: 'running' },
    ] as unknown as Animation[];
    const element = {
      animate: jest.fn().mockReturnValueOnce(animations[0]).mockReturnValueOnce(animations[1]),
    } as unknown as HTMLElement;
    const onfinish = jest.fn();
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, [{ keyframes: DEFAULT_KEYFRAMES }, { keyframes: DEFAULT_KEYFRAMES }], {
      isReducedMotion: false,
    });

    handle.setMotionEndCallbacks(onfinish, jest.fn());
    animations[1].onfinish?.(null as unknown as AnimationPlaybackEvent);

    expect(onfinish).toHaveBeenCalledTimes(1);
  });

  it('invalidates callbacks from a previous playback cycle when re-armed', () => {
    const animation = {
      persist: jest.fn(),
      playState: 'running',
    } as unknown as Animation;
    const element = { animate: jest.fn().mockReturnValue(animation) } as unknown as HTMLElement;
    const firstOnfinish = jest.fn();
    const secondOnfinish = jest.fn();
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });

    handle.setMotionEndCallbacks(firstOnfinish, jest.fn());
    const staleOnfinish = animation.onfinish;
    handle.setMotionEndCallbacks(secondOnfinish, jest.fn());
    staleOnfinish?.(null as unknown as AnimationPlaybackEvent);
    animation.onfinish?.(null as unknown as AnimationPlaybackEvent);

    expect(firstOnfinish).not.toHaveBeenCalled();
    expect(secondOnfinish).toHaveBeenCalledTimes(1);
  });

  it('invalidates callbacks when disposed', () => {
    jest.useFakeTimers();
    const animation = {
      persist: jest.fn(),
      playState: 'running',
    } as unknown as Animation;
    const element = { animate: jest.fn().mockReturnValue(animation) } as unknown as HTMLElement;
    const onfinish = jest.fn();
    const oncancel = jest.fn();
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });

    handle.setMotionEndCallbacks(onfinish, oncancel);
    const staleOnfinish = animation.onfinish;
    handle.dispose();
    staleOnfinish?.(null as unknown as AnimationPlaybackEvent);
    jest.runOnlyPendingTimers();

    expect(onfinish).not.toHaveBeenCalled();
    expect(oncancel).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
  });

  it('does not schedule recurring checks for paused animations', () => {
    jest.useFakeTimers();
    const animation = {
      persist: jest.fn(),
      playState: 'paused',
    } as unknown as Animation;
    const element = { animate: jest.fn().mockReturnValue(animation) } as unknown as HTMLElement;
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });

    handle.setMotionEndCallbacks(jest.fn(), jest.fn());

    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
  });

  it('finishes an empty animation handle on the next microtask', async () => {
    jest.useFakeTimers();
    const [element] = createErrorElementMock();
    const onfinish = jest.fn();
    const { result } = renderHook(() => useAnimateAtoms());
    const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });

    handle.setMotionEndCallbacks(onfinish, jest.fn());
    expect(onfinish).not.toHaveBeenCalled();
    await Promise.resolve();

    expect(onfinish).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
  });

  describe('reduce motion', () => {
    it('calls ".animate()" with regular motion', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createElementMock();
      const motion: AtomMotion = { keyframes: DEFAULT_KEYFRAMES };

      result.current(element, motion, { isReducedMotion: false });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(DEFAULT_KEYFRAMES, { ...DEFAULT_ANIMATION_OPTIONS });
    });

    it('calls ".animate()" with shortened duration (1ms) when reduced motion is enabled', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createElementMock();
      const motion: AtomMotion = { keyframes: DEFAULT_KEYFRAMES };

      result.current(element, motion, { isReducedMotion: true });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(DEFAULT_KEYFRAMES, { ...DEFAULT_ANIMATION_OPTIONS, duration: 1 });
    });

    it('calls ".animate()" with specified reduced motion keyframes when reduced motion is enabled', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createElementMock();
      const motion: AtomMotion = {
        keyframes: DEFAULT_KEYFRAMES,
        reducedMotion: { keyframes: REDUCED_MOTION_KEYFRAMES },
      };

      result.current(element, motion, { isReducedMotion: true });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(REDUCED_MOTION_KEYFRAMES, { ...DEFAULT_ANIMATION_OPTIONS });
    });

    it('calls ".animate()" with specified reduced motion params when reduced motion is enabled', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createElementMock();
      const motion: AtomMotion = {
        keyframes: DEFAULT_KEYFRAMES,
        reducedMotion: { duration: 100, easing: 'linear' },
      };

      result.current(element, motion, { isReducedMotion: true });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(DEFAULT_KEYFRAMES, {
        ...DEFAULT_ANIMATION_OPTIONS,
        easing: 'linear',
        duration: 100,
      });
    });
  });

  // See: https://github.com/microsoft/fluentui/issues/33902
  describe('error handling', () => {
    it('handle "element.animate()" returning null', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createNullElementMock();
      const motion: AtomMotion = {
        keyframes: DEFAULT_KEYFRAMES,
        reducedMotion: { duration: 100, easing: 'linear' },
      };

      const handle = result.current(element, motion, { isReducedMotion: false });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveReturnedWith(null);
      expect(handle).toBeDefined();
    });

    it('handles "element.animate()" throwing an error', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [element, animateMock] = createErrorElementMock();
      const motion: AtomMotion = {
        keyframes: DEFAULT_KEYFRAMES,
        reducedMotion: { duration: 100, easing: 'linear' },
      };

      const handle = result.current(element, motion, { isReducedMotion: false });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toThrow();
      expect(handle).toBeDefined();
    });
  });
});
