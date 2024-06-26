import { renderHook } from '@testing-library/react-hooks';

import { useDebounce } from './useDebounce';

const render = <T>(initialValue: T, delay: number) =>
  renderHook(value => useDebounce(value, delay), {
    initialProps: initialValue,
  });

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return the initial value immediately', () => {
    const { result } = render('initial value', 500);
    expect(result.current).toBe('initial value');
  });

  test('should update the debounced value after the specified delay', async () => {
    const { result, rerender } = render('initial value', 500);

    expect(result.current).toBe('initial value');

    rerender('updated value');

    jest.runAllTimers();

    expect(result.current).toBe('updated value');
  });

  test('should skip the previous update if a new update occurs within the delay', () => {
    const { result, rerender } = render('initial value', 500);

    rerender('updated value');

    jest.advanceTimersByTime(100);
    rerender('updated value 2');

    jest.advanceTimersByTime(100);
    rerender('updated value 3');

    expect(result.current).toBe('initial value');

    jest.runAllTimers();

    expect(result.current).toBe('updated value 3');
  });
});
