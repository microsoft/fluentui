import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('should return null initially', () => {
    // Arrange
    const value = {};

    // Act
    const { result } = renderHook(() => usePrevious(value));

    // Assert
    expect(result.current).toBeNull();
  });

  it('should return previous value on next render', () => {
    // Arrange
    const expected = 'first';
    let value = expected;
    const { result, rerender } = renderHook(() => usePrevious(value));

    // Act
    value = 'second';
    rerender();

    // Assert
    expect(result.current).toBe(expected);
  });
});
