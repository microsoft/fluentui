import { act, renderHook } from '@testing-library/react-hooks';

import { useMotion, MotionShorthand, MotionOptions, getDefaultMotionState } from './useMotion';

const cssDuration = 100;
const renderHookWithRef = (
  initialMotion: MotionShorthand,
  initialOptions?: MotionOptions,
  style: Record<string, string | undefined> = { 'transition-duration': `${cssDuration}ms` },
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(({ motion, options }) => useMotion(motion, options), {
    initialProps: {
      motion: initialMotion,
      options: initialOptions,
    } as { motion: MotionShorthand; options?: MotionOptions },
  });

  Object.entries(style).forEach(([key, value]) => value && refEl.style.setProperty(key, value));

  function renderRef() {
    act(() => {
      if (!hook.result.current.canRender) {
        return;
      }

      if (typeof hook.result.current.ref === 'function') {
        hook.result.current.ref(refEl);
      }
    });
  }

  act(() => renderRef());

  function rerender(motion: MotionShorthand, options?: MotionOptions) {
    hook.rerender({ motion, options });
    act(() => renderRef());
  }

  return { ...hook, rerender };
};

const jumpAnimationFrame = () => {
  act(() => {
    // Timeout to defer until the next animation frame
    jest.advanceTimersToNextTimer();

    // The actual animation frame to sync with the browser
    jest.advanceTimersToNextTimer();
  });
};

const jumpAnimationTimeout = (timeout: number = cssDuration) => {
  act(() => {
    // Timeout to finish the animation
    jest.advanceTimersByTime(timeout);

    // Animation frame to sync with the browser
    jest.advanceTimersToNextTimer();
  });
};

describe('useMotion', () => {
  let computedStyleMock: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    computedStyleMock = jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
      return {
        getPropertyValue: () => `${cssDuration}ms`,
      } as unknown as CSSStyleDeclaration;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('when presence is boolean', () => {
    it('should sync presence value with canRender', () => {
      const { result, rerender } = renderHookWithRef(false);

      expect(result.current.canRender).toBe(false);
      rerender(true);

      expect(result.current.canRender).toBe(true);
    });

    it('should return default values when presence is false', () => {
      const { result } = renderHookWithRef(false);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(false);
    });

    it('should return default values when presence is true', () => {
      const { result } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);
      expect(result.current.type).not.toBe('unmounted');
      expect(result.current.canRender).toBe(true);
    });

    it('should change visible to true when animateOnFirstMount is true', () => {
      const { result } = renderHookWithRef(true, { animateOnFirstMount: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(true);

      jumpAnimationFrame();

      expect(result.current.active).toBe(true);
    });
  });

  describe('when duration is provided', () => {
    it('should only call getComputedStyle when duration is not provided', () => {
      const { result, rerender } = renderHookWithRef(false, { duration: 300 });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(false);

      rerender(true, { duration: 300 });

      expect(result.current.canRender).toBe(true);
      expect(result.current.type).toBe('entering');
      expect(result.current.active).toBe(false);

      jumpAnimationFrame();
      jumpAnimationTimeout();

      expect(computedStyleMock).not.toHaveBeenCalled();

      rerender(false);

      jumpAnimationFrame();
      jumpAnimationTimeout();

      expect(computedStyleMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when presence is a MotionShorthand', () => {
    it('should return default values when presence is false', () => {
      const defaultState = getDefaultMotionState();
      const { result } = renderHookWithRef(defaultState);

      expect(result.current.type).toStrictEqual('unmounted');
      expect(result.current.ref).toStrictEqual(defaultState.ref);
      expect(result.current.active).toStrictEqual(false);
    });

    it('should return default values when presence is true', () => {
      const defaultState = getDefaultMotionState();
      const { result } = renderHookWithRef({ ...defaultState, active: true });

      expect(result.current.ref).toStrictEqual(defaultState.ref);
      expect(result.current.active).toStrictEqual(true);
    });
  });

  describe('when presence changes', () => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef(false);

      act(() => jest.advanceTimersToNextTimer());

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(false);

      rerender(true);

      expect(result.current.canRender).toBe(true);
      expect(result.current.type).toBe('entering');
      jumpAnimationFrame();

      expect(result.current.active).toBe(true);

      jumpAnimationTimeout();
      expect(result.current.type).toBe('entered');

      jumpAnimationFrame();
      expect(result.current.type).toBe('idle');

      rerender(false);

      expect(result.current.type).toBe('exiting');

      jumpAnimationFrame();
      expect(result.current.active).toBe(false);

      jumpAnimationTimeout();
      expect(result.current.type).toBe('exited');

      jumpAnimationFrame();
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(false);
    });

    it('should toggle values starting with true', () => {
      const { result, rerender } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.active).toBe(true);
      expect(result.current.canRender).toBe(true);

      rerender(false);

      expect(result.current.type).toBe('exiting');

      jumpAnimationFrame();
      expect(result.current.active).toBe(false);

      jumpAnimationTimeout();
      expect(result.current.type).toBe('exited');

      jumpAnimationFrame();
      expect(result.current.type).toBe('unmounted');
      expect(result.current.canRender).toBe(false);
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
      expect(result.current.canRender).toBe(false);

      rerender(true);

      expect(result.current.type).toBe('entering');

      jumpAnimationFrame();
      expect(result.current.active).toBe(true);

      jumpAnimationTimeout();
      expect(result.current.type).toBe('entered');

      jumpAnimationFrame();
      expect(result.current.type).toBe('idle');

      rerender(false);

      expect(result.current.type).toBe('exiting');

      jumpAnimationFrame();
      expect(result.current.active).toBe(false);

      jumpAnimationTimeout();
      expect(result.current.type).toBe('exited');

      jumpAnimationFrame();
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });

  describe.each([
    { message: 'with no transition', styles: { 'transition-duration': '0' } },
    { message: 'with no animation', styles: { 'animation-duration': '0' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef(false, {}, styles);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
      expect(result.current.canRender).toBe(false);

      rerender(true);

      expect(result.current.type).toBe('entering');

      jumpAnimationFrame();
      expect(result.current.active).toBe(true);

      jumpAnimationFrame();
      jumpAnimationTimeout(0);
      expect(result.current.type).toBe('entered');

      jumpAnimationFrame();
      expect(result.current.type).toBe('idle');

      rerender(false);

      expect(result.current.type).toBe('exiting');

      jumpAnimationFrame();
      expect(result.current.active).toBe(false);

      jumpAnimationFrame();
      jumpAnimationTimeout(0);
      expect(result.current.type).toBe('exited');

      jumpAnimationFrame();
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });
});
