import { renderHook } from '@testing-library/react-hooks';
import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('fires a callback', () => {
    const onUnmount = jest.fn();

    const result = renderHook(() => useUnmount(onUnmount));
    expect(onUnmount).toHaveBeenCalledTimes(0);
    result.unmount();
    expect(onUnmount).toHaveBeenCalledTimes(1);
  });
});
