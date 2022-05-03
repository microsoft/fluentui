import { useBoolean } from './useBoolean';
import { renderHook, act } from '@testing-library/react-hooks';
import type { UseBooleanCallbacks } from './useBoolean';

describe('useBoolean', () => {
  it.each([true, false])('respects initial value of %s', (initialValue: boolean) => {
    const { result } = renderHook(() => useBoolean(initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('returns the same callbacks', () => {
    const { result, rerender } = renderHook(() => useBoolean(true));
    const firstResult = result.current;
    rerender();

    expect(firstResult).toBeDefined();
    expect(result.current[1].setFalse).toBe(firstResult[1].setFalse);
    expect(result.current[1].setTrue).toBe(firstResult[1].setTrue);
    expect(result.current[1].toggle).toBe(firstResult[1].toggle);
  });

  it.each([
    ['setFalse', false, true],
    ['setTrue', true, false],
  ])('calls %s to update the value to %s', (callback, expectedValue, initialValue) => {
    const { result } = renderHook(() => useBoolean(initialValue));
    act(() => result.current[1][callback as keyof UseBooleanCallbacks]());

    expect(result.current[0]).toBe(expectedValue);
  });

  it.each([
    [true, false],
    [false, true],
  ])('toggles initial value %s to %s', (initialValue, expectedValue) => {
    const { result } = renderHook(() => useBoolean(initialValue));
    act(() => result.current[1].toggle());

    expect(result.current[0]).toBe(expectedValue);
  });
});
