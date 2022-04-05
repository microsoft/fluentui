import { useCallbackRef } from './useCallbackRef';
import { renderHook } from '@testing-library/react-hooks';

describe('useCallbackRef', () => {
  it('should invoke callback on assigning referentially different value', () => {
    // Arrange
    const initial = {};
    const first = { a: 1 };
    const second = { b: 2 };
    const callback = jest.fn();
    const { result } = renderHook(() => useCallbackRef<object>(initial, callback));

    // Act
    result.current.current = first;
    result.current.current = second;

    // Assert
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, first, initial);
    expect(callback).toHaveBeenNthCalledWith(2, second, first);
  });

  it('should not invoke callback setting referentially same value', () => {
    // Arrange
    const value = {};
    const callback = jest.fn();
    const { result } = renderHook(() => useCallbackRef<object>(value, callback));

    // Act
    result.current.current = value;

    // Assert
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should not invoke callback for initial value', () => {
    // Arrange
    const value = {};
    const callback = jest.fn();

    // Act
    renderHook(() => useCallbackRef<object>(value, callback));

    // Assert
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should skip initial resolve if `skipInitialResolve` is true', () => {
    // Arrange
    const callback = jest.fn();

    // Act
    renderHook(() => {
      const ref = useCallbackRef<object>(null, callback, true);
      ref.current = {};
    });

    // Assert
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
