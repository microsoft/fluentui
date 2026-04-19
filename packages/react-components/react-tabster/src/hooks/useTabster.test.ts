import { renderHook } from '@testing-library/react-hooks';
import { createLiteObserver } from 'tabster/lite/observer';
import { useTabster, getLiteObserver } from './useTabster';

jest.mock('tabster/lite/observer', () => {
  const dispose = jest.fn();
  return {
    createLiteObserver: jest.fn(() => ({ dispose, getInstance: jest.fn() })),
    __dispose: dispose,
  };
});

const createLiteObserverMock = createLiteObserver as jest.Mock;

describe('useTabster', () => {
  beforeEach(() => {
    createLiteObserverMock.mockClear();
  });

  it('creates a LiteObserver for the current document', () => {
    renderHook(() => useTabster());

    expect(createLiteObserverMock).toHaveBeenCalledTimes(1);
    expect(getLiteObserver(document)).not.toBeNull();
  });

  it('reuses the same observer across multiple consumers in the same document', () => {
    const { unmount: unmount1 } = renderHook(() => useTabster());
    const { unmount: unmount2 } = renderHook(() => useTabster());

    expect(createLiteObserverMock).toHaveBeenCalledTimes(1);

    unmount1();
    // Observer must still exist while at least one consumer is mounted.
    expect(getLiteObserver(document)).not.toBeNull();

    unmount2();
    // After the last consumer unmounts, the observer is disposed.
    expect(getLiteObserver(document)).toBeNull();
  });

  it('disposes the observer when the last consumer unmounts', () => {
    const { unmount } = renderHook(() => useTabster());
    const observer = getLiteObserver(document);
    expect(observer).not.toBeNull();

    unmount();

    expect(getLiteObserver(document)).toBeNull();
    expect(observer?.dispose).toHaveBeenCalledTimes(1);
  });
});
