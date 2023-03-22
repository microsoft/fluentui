import { renderHook } from '@testing-library/react-hooks';
import { SSRProvider, useIsSSR } from './SSRContext';

describe('useIsSSR', () => {
  it('returns "false" outside of SSRProvider', () => {
    const { result } = renderHook(() => useIsSSR());

    expect(result.current).toBe(false);
  });

  it('returns "true" inside SSRProvider', () => {
    const { result } = renderHook(() => useIsSSR(), { wrapper: SSRProvider });
    // will return "false" on initial render
    expect(result.current).toBe(false);
  });
});
