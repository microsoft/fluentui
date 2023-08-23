import { act, renderHook } from '@testing-library/react-hooks';

import { useMotion, UseMotionOptions, MotionShorthand, getDefaultMotionState, useIsMotion } from './useMotion';

const defaultDuration = 100;
const renderHookWithRef = (
  initialMotion: MotionShorthand,
  initialOptions?: UseMotionOptions,
  style: Record<string, string | undefined> = { 'transition-duration': `${defaultDuration}ms` },
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(({ motion, options }) => useMotion(motion, options), {
    initialProps: {
      motion: initialMotion,
      options: initialOptions,
    } as { motion: MotionShorthand; options?: UseMotionOptions },
  });

  Object.entries(style).forEach(([key, value]) => value && refEl.style.setProperty(key, value));

  act(() => {
    if (typeof hook.result.current.ref === 'function') {
      hook.result.current.ref(refEl);
    }
  });

  return hook;
};

const jumpToNextFrame = () => {
  act(() => {
    // requestAnimationFrame + timeout callbacks
    jest.advanceTimersToNextTimer();
    jest.advanceTimersToNextTimer();
  });
};

describe('useMotion', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('when presence is false by default', () => {
    it('should return default values when presence is false', () => {
      const { result } = renderHookWithRef(false);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe('when presence is true by default', () => {
    it('should return default values', () => {
      const { result } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);
    });

    it('should change visible to true when animateOnFirstMount is true', () => {
      const { result } = renderHookWithRef(true, { animateOnFirstMount: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(false);

      jumpToNextFrame();

      expect(result.current.active).toBe(true);
    });
  });

  describe('when presence changes', () => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef(false);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ motion: true });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('entering');
      expect(result.current.active).toBe(true);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.type).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('idle');

      rerender({ motion: false });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.type).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });

    it('should toggle values starting with true', () => {
      const { result, rerender } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);

      rerender({ motion: false });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.type).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe.each([
    { message: 'with transition', styles: { 'transition-duration': '100ms' } },
    { message: 'with long transition', styles: { 'transition-duration': '1000ms' } },
    { message: 'with animation', styles: { 'animation-duration': '100ms' } },
    { message: 'with long animation', styles: { 'animation-duration': '1000ms' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef(false, {}, styles);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ motion: true });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('entering');
      expect(result.current.active).toBe(true);

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('idle');

      rerender({ motion: false });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.type).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe.each([
    { message: 'with no transition', styles: { 'transition-duration': '0' } },
    { message: 'with no animation', styles: { 'animation-duration': '0' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values when transition-duration is 0', () => {
      const { result, rerender } = renderHookWithRef(false, {}, styles);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ motion: true });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('idle');

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.active).toBe(true);
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('idle');

      rerender({ motion: false });

      act(() => jest.advanceTimersToNextTimer());
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.active).toBe(false);

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.type).toBe('unmounted');
    });
  });

  describe('when motion is received', () => {
    it('should return default values when presence is false', () => {
      const defaultState = getDefaultMotionState();
      const { result } = renderHookWithRef(getDefaultMotionState());

      expect(result.current.type).toStrictEqual('unmounted');
      expect(result.current.ref).toStrictEqual(defaultState.ref);
      expect(result.current.active).toStrictEqual(false);
    });

    it('should return default values when presence is true', () => {
      const defaultState = getDefaultMotionState();
      const { result } = renderHookWithRef({ ...getDefaultMotionState(), active: true });

      expect(result.current.ref).toStrictEqual(defaultState.ref);
      expect(result.current.active).toStrictEqual(true);
    });
  });

  it('should show error when motion changes to a different type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => ({}));
    let defaultMotion: MotionShorthand = getDefaultMotionState();
    const { rerender } = renderHook(() => useIsMotion(defaultMotion));

    defaultMotion = false;

    rerender();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      [
        'useMotion: The hook needs to be called with the same typeof of shorthand on every render.',
        'This is to ensure the internal state of the hook is stable and can be used to accurately detect the motion state.',
        'Please make sure to not change the shorthand on subsequent renders or to use the hook conditionally.',
        '\nCurrent shorthand:',
        JSON.stringify(defaultMotion, null, 2),
        '\nPrevious shorthand:',
        JSON.stringify(getDefaultMotionState(), null, 2),
      ].join(' '),
    );
  });
});
