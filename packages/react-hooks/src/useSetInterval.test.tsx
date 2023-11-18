import { renderHook } from '@testing-library/react-hooks';

import { validateHookValueNotChanged } from './testUtilities';
import { useSetInterval } from './useSetInterval';

describe('useSetInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  validateHookValueNotChanged('returns the same callbacks each time', () => {
    const { setInterval, clearInterval } = useSetInterval();
    return [setInterval, clearInterval];
  });

  it('updates value when mounted', () => {
    const callback = jest.fn();
    const { result } = renderHook(useSetInterval);

    result.current.setInterval(callback, 100);

    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(2);
  });

  it('does not execute the interval when unmounted', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(useSetInterval);

    result.current.setInterval(callback, 100);

    unmount();

    jest.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();
  });

  it('can cancel intervals', () => {
    const callback = jest.fn();
    const { result } = renderHook(useSetInterval);

    const id = result.current.setInterval(callback, 100);

    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(1);

    result.current.clearInterval(id);
    jest.advanceTimersByTime(100);

    expect(callback).toBeCalledTimes(1);
  });
});
