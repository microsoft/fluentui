import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useMotionPresence, UseMotionPresenceOptions } from './useMotionPresence';

const defaultDuration = 100;
const renderHookWithRef = (
  initialPresence: boolean,
  initialOptions?: UseMotionPresenceOptions,
  style: Record<string, string | undefined> = { 'transition-duration': `${defaultDuration}ms` },
) => {
  const refEl = document.createElement('div');
  const hook = renderHook(
    ({ presence, options }) => {
      const state = useMotionPresence(presence, options);

      React.useEffect(() => {
        console.log(state);
      }, [state]);

      return state;
    },
    {
      initialProps: {
        presence: initialPresence,
        options: initialOptions,
      } as {
        presence: boolean;
        options?: UseMotionPresenceOptions;
      },
    },
  );

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

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
      expect(result.current.visible).toBe(false);
    });
  });

  describe('when presence is true by default', () => {
    it('should return default values', () => {
      const { result } = renderHookWithRef(true);

      expect(typeof result.current.ref).toBe('function');
      expect(result.current.motionState).toBe('resting');
      expect(result.current.shouldRender).toBe(true);
      expect(result.current.visible).toBe(true);
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
        jest.advanceTimersByTime(defaultDuration + 1);
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
        jest.advanceTimersByTime(defaultDuration + 1);
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
      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(true);
      expect(result.current.motionState).toBe('entering');
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('resting');

      rerender({ presence: false });

      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(false);
      expect(result.current.motionState).toBe('exiting');

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
    });
  });

  describe.each([
    { message: 'with no transition', styles: { 'transition-duration': '0' } },
    { message: 'with no animation', styles: { 'animation-duration': '0' } },
  ])('when presence changes - $message', ({ styles }) => {
    it('should toggle values when transition-duration is 0', () => {
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
      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(true);
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('resting');

      rerender({ presence: false });

      act(() => jest.advanceTimersToNextTimer());
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.visible).toBe(false);

      // requestAnimationFrame
      act(() => jest.advanceTimersToNextTimer());
      // timeout
      act(() => jest.advanceTimersToNextTimer());
      expect(result.current.motionState).toBe('unmounted');
      expect(result.current.shouldRender).toBe(false);
    });
  });
});
