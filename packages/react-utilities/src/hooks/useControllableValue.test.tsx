import { renderHook } from '@testing-library/react-hooks';
import { useControllableValue } from './useControllableValue';

describe('useControllableValue', () => {
  afterEach(jest.resetAllMocks);

  it('respects controlled value', () => {
    let value: boolean;
    let defaultValue: boolean | undefined;

    value = true;
    const { result, rerender } = renderHook(() =>
      useControllableValue({ controlledValue: value, defaultUncontrolledValue: defaultValue }),
    );
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

  it.each([
    ['', true],
    ['factory', () => true],
  ])('uses the default value %s if no controlled value is provided', (_, defaultUncontrolledValue) => {
    const { result } = renderHook(() => useControllableValue({ defaultUncontrolledValue }));
    expect(result.current[0]).toBe(true);
  });

  it('does not change value when the default value changes', () => {
    let defaultUncontrolledValue = true;
    const { result, rerender } = renderHook(() => useControllableValue({ defaultUncontrolledValue }));

    defaultUncontrolledValue = false;
    rerender();

    expect(result.current[0]).toBe(true);
  });

  it('returns the same setter callback', () => {
    const { result, rerender } = renderHook(() =>
      useControllableValue({ controlledValue: 'hello', defaultUncontrolledValue: 'world' }),
    );
    const firstResult = result.current;

    rerender();

    expect(result.current[1]).toEqual(firstResult[1]);
  });

  it('returns the same setter callback even if param values change', () => {
    let controlledValue = 'hello';
    let defaultUncontrolledValue = 'world';
    const { result, rerender } = renderHook(() => useControllableValue({ controlledValue, defaultUncontrolledValue }));
    const firstResult = result.current;

    controlledValue = 'foo';
    defaultUncontrolledValue = 'bar';
    rerender();

    expect(result.current[1]).toEqual(firstResult[1]);
  });

  it.each([
    ['a controlled value to be uncontrolled', 'defined to an undefined', 'hello', undefined],
    ['an uncontrolled value to be controlled', 'undefined to a defined', undefined, 'hello'],
  ])('warns when switching from %s', (controlWarning, undefinedWarning, first, second) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let value: string | undefined = first;
    const { rerender } = renderHook(() =>
      useControllableValue({ controlledValue: value, defaultUncontrolledValue: '' }),
    );

    value = second;
    rerender();

    expect(spy).toHaveBeenCalledTimes(1);
    const expectedWarning = `A component is changing ${controlWarning}. This is likely caused by the value changing from ${undefinedWarning} value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components`;
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(expectedWarning));
  });
});
