import { act, renderHook } from '@testing-library/react-hooks';

import { useMotion, MotionProps, MotionOptions } from './useMotion';

const defaultDuration = 100;
const renderHookWithRef = (
  initialState: MotionProps,
  initialOptions?: MotionOptions,
  style: Record<string, string | undefined> = { 'transition-duration': `${defaultDuration}ms` },
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(({ state, options }) => useMotion(state, options), {
    initialProps: {
      state: initialState,
      options: initialOptions,
    } as { state: MotionProps; options?: MotionOptions },
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
  });

  describe('when presence is false by default', () => {
    it('should return default values when presence is false', () => {
      const { result } = renderHookWithRef({ presence: false });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe('when presence is true by default', () => {
    it('should return default values', () => {
      const { result } = renderHookWithRef({ presence: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);
    });

    it('should change visible to true when animateOnFirstMount is true', () => {
      const { result } = renderHookWithRef({ presence: true }, { animateOnFirstMount: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(false);

      jumpToNextFrame();

      expect(result.current.active).toBe(true);
    });
  });

  describe('when presence changes', () => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef({ presence: false });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ state: { presence: true } });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('entering');
      expect(result.current.active).toBe(true);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.state).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('idle');

      rerender({ state: { presence: false } });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.state).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });

    it('should toggle values starting with true', () => {
      const { result, rerender } = renderHookWithRef({ presence: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);

      rerender({ state: { presence: false } });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersByTime(defaultDuration + 1));
      expect(result.current.state).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('unmounted');
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
      const { result, rerender } = renderHookWithRef({ presence: false }, {}, styles);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ state: { presence: true } });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('entering');
      expect(result.current.active).toBe(true);

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('idle');

      rerender({ state: { presence: false } });

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.state).toBe('exiting');
      expect(result.current.active).toBe(false);

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('exited');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe.each([
    { message: 'with no transition', styles: { 'transition-duration': '0' } },
    { message: 'with no animation', styles: { 'animation-duration': '0' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values when transition-duration is 0', () => {
      const { result, rerender } = renderHookWithRef({ presence: false }, {}, styles);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.state).toBe('unmounted');
      expect(result.current.active).toBe(false);

      rerender({ state: { presence: true } });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('entered');

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('idle');

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.active).toBe(true);
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('idle');

      rerender({ state: { presence: false } });

      act(() => jest.advanceTimersToNextTimer());
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.active).toBe(false);

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.state).toBe('unmounted');
    });
  });

  describe('when motion is received', () => {
    it('should return default values when presence is false', () => {
      const { result } = renderHookWithRef({ presence: false, state: 'unmounted', active: false });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.state).toBe('unmounted');
      expect(result.current.presence).toBe(false);
      expect(result.current.active).toBe(false);
    });

    it('should return default values when presence is true', () => {
      const { result } = renderHookWithRef({ presence: true, state: 'idle', active: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.presence).toBe(true);
      expect(result.current.active).toBe(true);
    });
  });
});
