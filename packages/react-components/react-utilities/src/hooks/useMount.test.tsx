import { renderHook } from '@testing-library/react-hooks';
import { useMount } from './useMount';

describe('useMount', () => {
  it('fires a callback', () => {
    const onMount = jest.fn();

    const result = renderHook(() => useMount(onMount));

    expect(onMount).toHaveBeenCalledTimes(1);
    result.unmount();
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
