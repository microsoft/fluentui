import { renderHook } from '@testing-library/react-hooks';

import type { AtomMotion } from '../types';
import { DEFAULT_ANIMATION_OPTIONS, useAnimateAtoms } from './useAnimateAtoms';

function createElementMock() {
  const animate = jest.fn().mockReturnValue({
    persist: jest.fn(),
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
});
