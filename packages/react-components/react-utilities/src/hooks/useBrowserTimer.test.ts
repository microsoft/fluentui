import { renderHook } from '@testing-library/react-hooks';
import { useBrowserTimer } from './useBrowserTimer';

const setTimer = jest.fn((callback: jest.Func) => {
  callback();
  return 0;
});

const cancelTimer = jest.fn(() => {
  return;
});

describe('useBrowserTimer', () => {
  it('should return array with functions', () => {
    const hookValues = renderHook(() => useBrowserTimer(setTimer, cancelTimer)).result.current;

    expect(hookValues).toHaveLength(2);
    expect(typeof hookValues[0]).toBe('function');
    expect(typeof hookValues[1]).toBe('function');
  });

  it('calls the setter only n times', () => {
    const [setTestTimer] = renderHook(() => useBrowserTimer(setTimer, cancelTimer)).result.current;
    const callback = jest.fn();

    setTestTimer(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalledTimes(2);
    expect(setTimer).toHaveBeenCalledTimes(1);
    expect(setTimer).not.toHaveBeenCalledTimes(2);
  });

  it('setter should return timer id', () => {
    const [setTestTimer] = renderHook(() => useBrowserTimer(setTimer, cancelTimer)).result.current;
    const callback = jest.fn();

    const timerId = setTestTimer(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(timerId).toBe(0);
  });

  it('should not call the cancel callback if no setter was called', () => {
    const [, cancelTestTimer] = renderHook(() => useBrowserTimer(setTimer, cancelTimer)).result.current;

    cancelTestTimer();

    expect(cancelTimer).not.toHaveBeenCalledTimes(1);
  });

  it('calls the cancel only n times', () => {
    const [setTestTimer, cancelTestTimer] = renderHook(() => useBrowserTimer(setTimer, cancelTimer)).result.current;

    setTestTimer(jest.fn());
    cancelTestTimer();

    expect(cancelTimer).toHaveBeenCalledTimes(1);
    expect(cancelTimer).not.toHaveBeenCalledTimes(2);
  });
});
