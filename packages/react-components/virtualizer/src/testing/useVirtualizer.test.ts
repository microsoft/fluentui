import { renderHook } from '@testing-library/react-hooks';
import { useVirtualizer_unstable } from '../useVirtualizer';

describe('useVirtualizer', () => {
  it('should return sort state', () => {
    const { result } = renderHook(() =>
      useVirtualizer_unstable({
        virtualizerLength: 100, // 100 Items
        itemSize: 100, // 100 pixels
      }),
    );

    // Initial render shows only first 100 items
    expect(result.current.virtualizedChildren.length).toBe(100);
    expect(result.current.virtualizerStartIndex).toBe(0);
  });
});
