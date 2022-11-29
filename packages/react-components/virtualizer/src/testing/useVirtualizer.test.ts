import { renderHook } from '@testing-library/react-hooks';
import { useVirtualizer_unstable } from '../useVirtualizer';

describe('useVirtualizer', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should have the correct number of initial items', () => {
    const virtualizerLength = 50;
    const actualLength = 250;
    const divArr = new Array(actualLength).fill('Test-Node');

    const { result } = renderHook(() =>
      useVirtualizer_unstable({
        virtualizerLength,
        itemSize: 100, // 100 pixels
        children: divArr,
      }),
    );

    // Initial render shows only first 100 items
    expect(result.current.virtualizedChildren.length).toBe(virtualizerLength);
    // First render state
    expect(result.current.virtualizerStartIndex).toBe(-1);
  });
});
