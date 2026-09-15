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

function createControllableElementMock() {
  let onfinish: Animation['onfinish'];
  let oncancel: Animation['oncancel'];
  let playState: AnimationPlayState = 'running';
  const play = jest.fn(() => {
    playState = 'running';
  });
  const cancel = jest.fn(() => {
    playState = 'idle';
  });
  const animation = {
    persist: jest.fn(),
    play,
    cancel,
    get playState() {
      return playState;
    },
    set onfinish(callback: Animation['onfinish']) {
      onfinish = callback;
    },
    set oncancel(callback: Animation['oncancel']) {
      oncancel = callback;
    },
  } as Partial<Animation> as Animation;
  const animate = jest.fn().mockReturnValue(animation);

  return {
    element: { animate } as unknown as HTMLElement,
    animation,
    cancel,
    dispatchCancel: () => oncancel?.call(animation, {} as AnimationPlaybackEvent),
    emitCancel: () => {
      playState = 'idle';
      oncancel?.call(animation, {} as AnimationPlaybackEvent);
    },
    emitFinish: () => {
      playState = 'finished';
      onfinish?.call(animation, {} as AnimationPlaybackEvent);
    },
    play,
  };
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
    it('handle "element.animate()" returning null', async () => {
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

      const onfinish = jest.fn();
      handle.setMotionEndCallbacks(onfinish, jest.fn());
      await Promise.resolve();
      expect(onfinish).toHaveBeenCalledTimes(1);
    });

    it('handles "element.animate()" throwing an error', async () => {
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

      const onfinish = jest.fn();
      handle.setMotionEndCallbacks(onfinish, jest.fn());
      await Promise.resolve();
      expect(onfinish).toHaveBeenCalledTimes(1);
    });

    it('waits for queued cancel events before arming a replay on reused animations', () => {
      const { result } = renderHook(() => useAnimateAtoms());
      const { element, cancel, emitCancel, emitFinish, play } = createControllableElementMock();
      const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });
      const firstOnCancel = jest.fn();
      const secondOnFinish = jest.fn();
      const secondOnCancel = jest.fn();

      handle.setMotionEndCallbacks(jest.fn(), firstOnCancel);
      handle.replay(() => handle.setMotionEndCallbacks(secondOnFinish, secondOnCancel));

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(play).not.toHaveBeenCalled();

      emitCancel();

      expect(firstOnCancel).toHaveBeenCalledTimes(1);
      expect(play).toHaveBeenCalledTimes(1);
      expect(secondOnCancel).not.toHaveBeenCalled();

      emitFinish();

      expect(secondOnFinish).toHaveBeenCalledTimes(1);
      expect(secondOnCancel).not.toHaveBeenCalled();
    });

    it('coalesces rapid replay requests while cancellation is pending', () => {
      const { result } = renderHook(() => useAnimateAtoms());
      const { element, emitCancel, emitFinish, play } = createControllableElementMock();
      const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });
      const firstReplay = jest.fn();
      const latestOnFinish = jest.fn();
      const latestReplay = jest.fn(() => handle.setMotionEndCallbacks(latestOnFinish, jest.fn()));

      handle.setMotionEndCallbacks(jest.fn(), jest.fn());
      handle.replay(firstReplay);
      handle.replay(latestReplay);

      emitCancel();

      expect(firstReplay).not.toHaveBeenCalled();
      expect(latestReplay).toHaveBeenCalledTimes(1);
      expect(play).toHaveBeenCalledTimes(1);

      emitFinish();
      expect(latestOnFinish).toHaveBeenCalledTimes(1);
    });

    it('does not cancel a cycle that finished while replay cancellation was pending', () => {
      const { result } = renderHook(() => useAnimateAtoms());
      const { element, emitCancel, emitFinish } = createControllableElementMock();
      const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });
      const firstOnFinish = jest.fn();
      const firstOnCancel = jest.fn();
      const secondOnFinish = jest.fn();

      handle.setMotionEndCallbacks(firstOnFinish, firstOnCancel);
      handle.replay(() => handle.setMotionEndCallbacks(secondOnFinish, jest.fn()));

      emitFinish();
      emitCancel();

      expect(firstOnFinish).toHaveBeenCalledTimes(1);
      expect(firstOnCancel).not.toHaveBeenCalled();

      emitFinish();
      expect(secondOnFinish).toHaveBeenCalledTimes(1);
    });

    it('lets imperative play supersede a pending replay without deadlocking future replays', () => {
      const { result } = renderHook(() => useAnimateAtoms());
      const { dispatchCancel, element, emitCancel, emitFinish } = createControllableElementMock();
      const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });
      const supersedingOnCancel = jest.fn();
      const replayAfterImperativePlay = jest.fn();

      handle.setMotionEndCallbacks(jest.fn(), jest.fn());
      handle.replay(jest.fn());

      handle.play();
      handle.setMotionEndCallbacks(jest.fn(), supersedingOnCancel);
      dispatchCancel();

      expect(supersedingOnCancel).not.toHaveBeenCalled();

      handle.replay(replayAfterImperativePlay);
      emitCancel();

      expect(replayAfterImperativePlay).toHaveBeenCalledTimes(1);
      expect(supersedingOnCancel).toHaveBeenCalledTimes(1);

      handle.setMotionEndCallbacks(jest.fn(), supersedingOnCancel);
      emitFinish();
      expect(supersedingOnCancel).toHaveBeenCalledTimes(1);
    });

    it('does not complete a replay superseded from the canceled cycle callback', () => {
      const { result } = renderHook(() => useAnimateAtoms());
      const { element, emitCancel } = createControllableElementMock();
      const handle = result.current(element, { keyframes: DEFAULT_KEYFRAMES }, { isReducedMotion: false });
      const replayCallback = jest.fn();

      handle.setMotionEndCallbacks(jest.fn(), () => handle.play());
      handle.replay(replayCallback);

      emitCancel();

      expect(replayCallback).not.toHaveBeenCalled();
    });
  });
});
