import { renderHook } from '@testing-library/react-hooks';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { focusAsync } from './focus';

describe('focusAsync', () => {
  const getWindow = () => {
    const { result, unmount } = renderHook(() => useFluent_unstable());
    const win = result.current.targetDocument?.defaultView;
    unmount();
    if (!win) {
      throw new Error('The focus tests require a DOM window.');
    }
    return win;
  };

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('defers focus until the next animation frame', () => {
    const element = { focus: jest.fn() };
    focusAsync(element, getWindow());
    expect(element.focus).not.toHaveBeenCalled();
    jest.advanceTimersToNextFrame();
    expect(element.focus).toHaveBeenCalledTimes(1);
  });

  it('schedules one frame and focuses only the latest target', () => {
    const win = getWindow();
    const requestFrame = jest.spyOn(win, 'requestAnimationFrame');
    const first = { focus: jest.fn() };
    const latest = { focus: jest.fn() };
    focusAsync(first, win);
    focusAsync(latest, win);
    expect(requestFrame).toHaveBeenCalledTimes(1);
    expect(latest.focus).not.toHaveBeenCalled();
    jest.advanceTimersToNextFrame();
    expect(first.focus).not.toHaveBeenCalled();
    expect(latest.focus).toHaveBeenCalledTimes(1);
  });

  it('schedules focus independently for each window', () => {
    const createWindow = () => {
      let callback: FrameRequestCallback | undefined;
      return {
        requestAnimationFrame: jest.fn(nextCallback => {
          callback = nextCallback;
          return 0;
        }),
        runFrame: () => callback?.(0),
      };
    };
    const firstWindow = createWindow();
    const secondWindow = createWindow();
    const first = { focus: jest.fn() };
    const second = { focus: jest.fn() };

    focusAsync(first, firstWindow);
    focusAsync(second, secondWindow);

    expect(firstWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(secondWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
    secondWindow.runFrame();
    expect(second.focus).toHaveBeenCalledTimes(1);
    expect(first.focus).not.toHaveBeenCalled();
    firstWindow.runFrame();
    expect(first.focus).toHaveBeenCalledTimes(1);
  });

  it('can schedule another target after the previous frame', () => {
    const win = getWindow();
    const first = { focus: jest.fn() };
    const second = { focus: jest.fn() };
    focusAsync(first, win);
    jest.advanceTimersToNextFrame();
    focusAsync(second, win);
    expect(second.focus).not.toHaveBeenCalled();
    jest.advanceTimersToNextFrame();
    expect(first.focus).toHaveBeenCalledTimes(1);
    expect(second.focus).toHaveBeenCalledTimes(1);
  });

  it('allows a focus handler to queue the next target', () => {
    const win = getWindow();
    const next = { focus: jest.fn() };
    const first = {
      focus: jest.fn(() => {
        focusAsync(next, win);
      }),
    };

    focusAsync(first, win);
    jest.advanceTimersToNextFrame();
    expect(first.focus).toHaveBeenCalledTimes(1);
    expect(next.focus).not.toHaveBeenCalled();
    jest.advanceTimersToNextFrame();
    expect(next.focus).toHaveBeenCalledTimes(1);
  });

  it('clears the queue when focus throws', () => {
    const win = getWindow();
    const first = {
      focus: jest.fn(() => {
        throw new Error('focus failed');
      }),
    };
    const next = { focus: jest.fn() };

    focusAsync(first, win);
    expect(() => jest.advanceTimersToNextFrame()).toThrow('focus failed');
    focusAsync(next, win);
    jest.advanceTimersToNextFrame();
    expect(next.focus).toHaveBeenCalledTimes(1);
  });

  it.each([null, undefined])('ignores a missing target or window (%s)', missing => {
    const win = getWindow();
    const requestFrame = jest.spyOn(win, 'requestAnimationFrame');
    const element = { focus: jest.fn() };
    focusAsync(missing, win);
    focusAsync(element, missing);
    expect(requestFrame).not.toHaveBeenCalled();
    jest.advanceTimersToNextFrame();
    expect(element.focus).not.toHaveBeenCalled();
  });
});
