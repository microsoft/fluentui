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

  describe('target', () => {
    it('animates motion.target instead of the root element and omits target from WAAPI options', () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const [rootElement, rootAnimateMock] = createElementMock();
      const [targetElement, targetAnimateMock] = createElementMock();
      const motion: AtomMotion = {
        target: targetElement,
        keyframes: DEFAULT_KEYFRAMES,
        duration: 200,
        delay: 50,
      };

      result.current(rootElement, motion, { isReducedMotion: false });

      expect(rootAnimateMock).not.toHaveBeenCalled();
      expect(targetAnimateMock).toHaveBeenCalledTimes(1);
      expect(targetAnimateMock).toHaveBeenCalledWith(DEFAULT_KEYFRAMES, {
        ...DEFAULT_ANIMATION_OPTIONS,
        duration: 200,
        delay: 50,
      });
    });

    it('controls mixed root and targeted atoms through one AnimationHandle', async () => {
      const { result } = renderHook(() => useAnimateAtoms());

      const rootAnimation = {
        persist: jest.fn(),
        cancel: jest.fn(),
        finish: jest.fn(),
        onfinish: null as null | (() => void),
        oncancel: null as null | (() => void),
      };
      const targetAnimation = {
        persist: jest.fn(),
        cancel: jest.fn(),
        finish: jest.fn(),
        onfinish: null as null | (() => void),
        oncancel: null as null | (() => void),
      };
      const rootElement = { animate: jest.fn().mockReturnValue(rootAnimation) } as unknown as HTMLElement;
      const targetElement = { animate: jest.fn().mockReturnValue(targetAnimation) } as unknown as HTMLElement;

      const handle = result.current(
        rootElement,
        [
          { keyframes: DEFAULT_KEYFRAMES, duration: 200 },
          { target: targetElement, keyframes: REDUCED_MOTION_KEYFRAMES, duration: 150, delay: 60 },
        ],
        { isReducedMotion: false },
      );

      const onFinish = jest.fn();
      const onCancel = jest.fn();
      handle.setMotionEndCallbacks(onFinish, onCancel);

      rootAnimation.onfinish?.();
      await new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      });
      expect(onFinish).not.toHaveBeenCalled();

      targetAnimation.onfinish?.();
      await new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      });
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onCancel).not.toHaveBeenCalled();

      handle.cancel();
      expect(rootAnimation.cancel).toHaveBeenCalledTimes(1);
      expect(targetAnimation.cancel).toHaveBeenCalledTimes(1);
    });
  });
});
