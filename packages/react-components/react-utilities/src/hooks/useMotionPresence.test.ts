import { renderHook } from '@testing-library/react-hooks';

import { useMotionPresence } from './useMotionPresence';

describe('useMotionPresence', () => {
  it('should return default values when presence is true', () => {
    const { result } = renderHook(() => useMotionPresence(false));
    const { ref, motionState, shouldRender, visible } = result.current;

    expect(typeof ref).toBe('function');
    expect(motionState).toBe('unmounted');
    expect(shouldRender).toBe(false);
    expect(visible).toBe(false);
  });

  it('should return default values when presence is false', () => {
    const { result } = renderHook(() => useMotionPresence(true));
    const { ref, motionState, shouldRender, visible } = result.current;

    expect(typeof ref).toBe('function');
    expect(motionState).toBe('resting');
    expect(shouldRender).toBe(true);
    expect(visible).toBe(false);
  });
});
