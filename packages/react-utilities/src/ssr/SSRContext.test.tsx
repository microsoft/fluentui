import { renderHook } from '@testing-library/react-hooks';
import { useIsSSR } from './SSRContext';

describe('useIsSSR', () => {
  it('returns "false" in DOM env', () => {
    const { result } = renderHook(() => useIsSSR());

    expect(result.current).toBe(false);
  });
});
