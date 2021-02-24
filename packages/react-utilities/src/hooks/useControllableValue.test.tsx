import { renderHook } from '@testing-library/react-hooks';
import { useControllableValue } from './useControllableValue';

describe('useControllableValue', () => {
  it('respects controlled value', () => {
    let value: boolean;
    let defaultValue: boolean | undefined;

    value = true;
    const { result, rerender } = renderHook(() => useControllableValue(value, defaultValue));
    expect(result.current[0]).toBe(true);

    value = false;
    rerender();
    expect(result.current[0]).toBe(false);

    value = false;
    defaultValue = true;
    rerender();
    expect(result.current[0]).toBe(false);

    value = true;
    rerender();
    expect(result.current[0]).toBe(true);
  });

  it('uses the default value if no controlled value is provided', () => {
    const { result } = renderHook(() => useControllableValue(undefined, true));
    expect(result.current[0]).toBe(true);
  });

  it('does not change value when the default value changes', () => {
    let defaultValue = true;
    const { result, rerender } = renderHook(() => useControllableValue(undefined, defaultValue));

    defaultValue = false;
    rerender();

    expect(result.current[0]).toBe(true);
  });

  it('returns the same setter callback', () => {
    const { result, rerender } = renderHook(() => useControllableValue('hello', 'world'));
    const firstResult = result.current;

    rerender();

    expect(result.current[1]).toEqual(firstResult[1]);
  });

  it('returns the same setter callback even if param values change', () => {
    let value = 'hello';
    let defaultValue = 'world';
    const { result, rerender } = renderHook(() => useControllableValue(value, defaultValue));
    const firstResult = result.current;

    value = 'foo';
    defaultValue = 'bar';
    rerender();

    expect(result.current[1]).toEqual(firstResult[1]);
  });
});
