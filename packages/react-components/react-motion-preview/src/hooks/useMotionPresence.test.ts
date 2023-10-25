import { act, renderHook } from '@testing-library/react-hooks';

import { useMotionPresence, MotionOptions } from './useMotionPresence';

const defaultDuration = 100;
const renderHookWithRef = (
  initialPresence: boolean,
  initialOptions?: MotionOptions,
  style: Record<string, string | undefined> = { 'transition-duration': `${defaultDuration}ms` },
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(({ presence, options }) => useMotionPresence(presence, options), {
    initialProps: {
      presence: initialPresence,
      options: initialOptions,
    } as { presence: boolean; options?: MotionOptions },
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

  function rerender(presence: boolean, options?: MotionOptions) {
    hook.rerender({ presence, options });
    act(() => renderRef());
  }

  return { ...hook, rerender };
};

const jumpAnimationFrame = () => {
  // requestAnimationFrame
  act(() => jest.advanceTimersToNextTimer());
};

const jumpAnimationTimeout = (timeout: number = defaultDuration) => {
  // timeout + requestAnimationFrame
  act(() => {
    jest.advanceTimersByTime(timeout);
    jest.advanceTimersToNextTimer();
  });
};

describe('useMotionPresence', () => {
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
      expect(result.current.canRender).toBe(false);
    });

    it('should sync presence value with canRender', () => {
      const { result, rerender } = renderHookWithRef(false);

      expect(result.current.canRender).toBe(false);
      rerender(true);

      expect(result.current.canRender).toBe(true);
    });
  });

  describe('when presence is true by default', () => {
    it('should return default values', () => {
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

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.active).toBe(true);
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

      jumpAnimationTimeout(0);
      expect(result.current.type).toBe('entered');

      jumpAnimationFrame();
      expect(result.current.type).toBe('idle');

      rerender(false);

      expect(result.current.type).toBe('exiting');

      jumpAnimationFrame();
      expect(result.current.active).toBe(false);

      jumpAnimationTimeout(0);
      expect(result.current.type).toBe('exited');

      jumpAnimationFrame();
      expect(result.current.type).toBe('unmounted');
      expect(result.current.active).toBe(false);
    });
  });
});
