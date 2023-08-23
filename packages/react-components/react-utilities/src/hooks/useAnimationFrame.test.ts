import { renderHook } from '@testing-library/react-hooks';
import { useAnimationFrame } from './useAnimationFrame';

describe('useAnimationFrame', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('calls the callback only on the next frame', () => {
    const [setTestRequestAnimationFrame] = renderHook(() => useAnimationFrame()).result.current;
    const callback = jest.fn();

    setTestRequestAnimationFrame(callback);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback if cancel is called', () => {
    const [setTestRequestAnimationFrame, cancelTEstRequestAnimationFrame] = renderHook(() => useAnimationFrame()).result
      .current;
    const callback = jest.fn();

    setTestRequestAnimationFrame(callback);
    cancelTEstRequestAnimationFrame();

    jest.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
  });

  it('cancel the previous requestAnimationFrame if set is called again', () => {
    const [setTestRequestAnimationFrame] = renderHook(() => useAnimationFrame()).result.current;
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    setTestRequestAnimationFrame(callbackA);
    setTestRequestAnimationFrame(callbackB);

    jest.runAllTimers();

    expect(callbackA).not.toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
  });

  it('allows another requestAnimationFrame to be set after the previous has run', () => {
    const [setTestRequestAnimationFrame] = renderHook(() => useAnimationFrame()).result.current;
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    setTestRequestAnimationFrame(callbackA);

    jest.runAllTimers();

    setTestRequestAnimationFrame(callbackB);

    jest.runAllTimers();

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
  });

  it('does not cancel the requestAnimationFrame between renders', () => {
    const { result, rerender } = renderHook(() => useAnimationFrame());
    const [setTestRequestAnimationFrame] = result.current;
    const callback = jest.fn();

    setTestRequestAnimationFrame(callback);

    rerender();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancel the requestAnimationFrame when the component is unmounted', () => {
    const { result, unmount } = renderHook(() => useAnimationFrame());
    const [setTestRequestAnimationFrame] = result.current;
    const callback = jest.fn();

    setTestRequestAnimationFrame(callback);

    unmount();

    jest.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
  });

  it('returns the same functions every render', () => {
    const { result, rerender } = renderHook(() => useAnimationFrame());
    const [setTestRequestAnimationFrame, cancelTEstRequestAnimationFrame] = result.current;

    rerender();

    expect(result.current).toStrictEqual([setTestRequestAnimationFrame, cancelTEstRequestAnimationFrame]);
  });
});
