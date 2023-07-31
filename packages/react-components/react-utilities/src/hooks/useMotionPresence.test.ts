import { act, renderHook } from '@testing-library/react-hooks';

import { useMotionPresence, UseMotionPresenceOptions } from './useMotionPresence';

const transitionDuration = 100;
const defaultStyles = { 'transition-duration': `${transitionDuration}ms` };
const renderHookWithRef = (
  initialPresence: boolean,
  initialOptions?: UseMotionPresenceOptions,
  style: Record<string, string | undefined> = defaultStyles,
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(({ presence, options }) => useMotionPresence(presence, options), {
    initialProps: {
      presence: initialPresence,
      options: initialOptions,
    } as {
      presence: boolean;
      options?: UseMotionPresenceOptions;
    },
  });

  Object.entries(style).forEach(([key, value]) => value && refEl.style.setProperty(key, value));

  act(() => hook.result.current.ref(refEl));

  return hook;
};

describe('useMotionPresence', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('when presence is false by default', () => {
    it('should return default values when presence is false', () => {
      const { result } = renderHookWithRef(false);
      const { ref, motionState, shouldRender, visible } = result.current;

      expect(typeof ref).toBe('function');
      expect(motionState).toBe('unmounted');
      expect(shouldRender).toBe(false);
      expect(visible).toBe(false);
    });
  });

  describe('when presence is true by default', () => {
    it('should return default values', () => {
      const { result } = renderHookWithRef(true);
      const { ref, motionState, shouldRender, visible } = result.current;

      expect(typeof ref).toBe('function');
      expect(motionState).toBe('resting');
      expect(shouldRender).toBe(true);
      expect(visible).toBe(true);
    });

    it('should not change values after timeout ', () => {
      const { result } = renderHookWithRef(true);

      const assertSameValues = () => {
        expect(typeof result.current.ref).toBe('function');
        expect(result.current.motionState).toBe('resting');
        expect(result.current.shouldRender).toBe(true);
        expect(result.current.visible).toBe(true);
      };

      assertSameValues();
      act(() => jest.advanceTimersToNextTimer());
      assertSameValues();
    });

    it('should change visible to true when animateOnFirstMount is true', () => {
      const { result } = renderHookWithRef(true, { animateOnFirstMount: true });

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('resting');
      expect(result.current.shouldRender).toBe(true);
      expect(result.current.visible).toBe(false);

      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.visible).toBe(true);
    });
  });

  describe('when presence changes', () => {
    it('should toggle values starting with false', () => {
      const { result, rerender } = renderHookWithRef(false);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
      expect(result.current.visible).toBe(false);

      rerender({ presence: true });

      expect(result.current.shouldRender).toBe(true);
      expect(result.current.motionState).toBe('resting');

      // double requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(true);

      rerender({ presence: false });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('exiting');
      expect(result.current.visible).toBe(false);

      act(() => {
        // requestAnimationFrame
        act(() => jest.advanceTimersToNextTimer());

        // timeout
        jest.advanceTimersByTime(transitionDuration + 1);
      });

      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
      expect(result.current.visible).toBe(false);
    });

    it('should toggle values starting with true', () => {
      const { result, rerender } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('resting');
      expect(result.current.shouldRender).toBe(true);
      expect(result.current.visible).toBe(true);

      rerender({ presence: false });

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());

      expect(result.current.motionState).toBe('exiting');
      expect(result.current.visible).toBe(false);

      act(() => {
        // requestAnimationFrame
        jest.advanceTimersToNextTimer();

        // timeout
        jest.advanceTimersByTime(transitionDuration + 1);
      });

      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
      expect(result.current.visible).toBe(false);
    });
  });

  describe.each([
    { message: 'with transition', styles: { 'transition-duration': '100ms' } },
    { message: 'with long transition', styles: { 'transition-duration': '1000ms' } },
    { message: 'with animation', styles: { 'animation-duration': '100ms' } },
    { message: 'with long animation', styles: { 'animation-duration': '1000ms' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values starting with false when animateOnFirstMount is true', () => {
      const { result, rerender } = renderHookWithRef(
        false,
        {
          animateOnFirstMount: true,
        },
        styles,
      );

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
      expect(result.current.visible).toBe(false);

      rerender({ presence: true });

      expect(result.current.shouldRender).toBe(true);
      expect(result.current.motionState).toBe('resting');
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(true);
      expect(result.current.motionState).toBe('entering');
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('resting');

      rerender({ presence: false });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(false);
      expect(result.current.motionState).toBe('exiting');

      act(() => jest.advanceTimersToNextTimer());
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
    });
  });
});
