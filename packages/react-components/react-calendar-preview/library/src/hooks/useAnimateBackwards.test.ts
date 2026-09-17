import { renderHook } from '@testing-library/react';
import { useAnimateBackwards } from './useAnimateBackwards';

describe('useAnimateBackwards', () => {
  it('returns undefined on mount and false when the value is unchanged', () => {
    const { result, rerender } = renderHook(({ value }) => useAnimateBackwards(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 1 });
    expect(result.current).toBe(false);
  });

  it('returns the navigation direction after the value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useAnimateBackwards(value), {
      initialProps: { value: 2 },
    });

    rerender({ value: 1 });
    expect(result.current).toBe(true);

    rerender({ value: 3 });
    expect(result.current).toBe(false);
  });
});
