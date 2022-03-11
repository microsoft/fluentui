import { useFirstMount } from './useFirstMount';
import { renderHook } from '@testing-library/react-hooks';

describe('useFirstMount', () => {
  it('should not return true after first render', () => {
    // Arrange
    const { result, rerender } = renderHook(useFirstMount);

    // Act
    rerender();

    // Assert
    expect(result.current()).toBe(false);
  });

  it('should return true after first render', () => {
    // Act
    let result: boolean | undefined = undefined;
    renderHook(() => (result = useFirstMount()()));

    // Assert
    expect(result).toBe(true);
  });
});
