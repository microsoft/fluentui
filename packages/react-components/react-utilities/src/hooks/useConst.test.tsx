import { renderHook } from '@testing-library/react-hooks';
import { useConst } from './useConst';

describe('useConst', () => {
  it('returns the same value with value initializer', () => {
    const { result, rerender } = renderHook(() => useConst(Math.random()));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('returns the same value with function initializer', () => {
    const { result, rerender } = renderHook(() => useConst(() => Math.random()));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('calls the function initializer only once', () => {
    const initializer = jest.fn(() => Math.random());
    const { result, rerender } = renderHook(() => useConst(initializer));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('works with a function initializer which returns undefined', () => {
    const initializer = jest.fn(() => undefined);
    const { rerender } = renderHook(() => useConst(initializer));

    rerender();

    // Function shouldn't have been called again
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
