import { renderHook } from '@testing-library/react-hooks';
import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls the callback only after the timeout has elapsed', () => {
    const [setTestTimeout] = renderHook(() => useTimeout()).result.current;
    const callback = jest.fn();

    setTestTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback if clear is called', () => {
    const [setTestTimeout, clearTestTimeout] = renderHook(() => useTimeout()).result.current;
    const callback = jest.fn();

    setTestTimeout(callback, 1000);
    clearTestTimeout();

    jest.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
  });

  it('clears the previous timeout if set is called again', () => {
    const [setTestTimeout] = renderHook(() => useTimeout()).result.current;
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    setTestTimeout(callbackA, 1000);
    setTestTimeout(callbackB, 1000);

    jest.runAllTimers();

    expect(callbackA).not.toHaveBeenCalled();
    expect(callbackB).toHaveBeenCalledTimes(1);
  });

  it('allows another timeout to be set after the previous has run', () => {
    const [setTestTimeout] = renderHook(() => useTimeout()).result.current;
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    setTestTimeout(callbackA, 1000);

    jest.runAllTimers();

    setTestTimeout(callbackB, 1000);

    jest.runAllTimers();

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
  });

  it('does not clear the timeout between renders', () => {
    const { result, rerender } = renderHook(() => useTimeout());
    const [setTestTimeout] = result.current;
    const callback = jest.fn();

    setTestTimeout(callback, 1000);

    rerender();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('clears the timeout when the component is unmounted', () => {
    const { result, unmount } = renderHook(() => useTimeout());
    const [setTestTimeout] = result.current;
    const callback = jest.fn();

    setTestTimeout(callback, 1000);

    unmount();

    jest.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
  });

  it('returns the same functions every render', () => {
    const { result, rerender } = renderHook(() => useTimeout());
    const [setTestTimeout, clearTestTimeout] = result.current;

    rerender();

    expect(result.current).toStrictEqual([setTestTimeout, clearTestTimeout]);
  });
});
