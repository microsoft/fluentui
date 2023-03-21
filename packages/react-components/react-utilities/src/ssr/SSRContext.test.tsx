import { renderHook } from '@testing-library/react-hooks';
import { SSRProvider, useIsSSR, useIsInSSRContext } from './SSRContext';

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

describe('useIsInSSRContext', () => {
  it('returns true if wrapped by an SSRProvider', () => {
    const { result } = renderHook(() => useIsInSSRContext(), { wrapper: SSRProvider });
    expect(result.current).toBe(true);
  });

  it('returns false if not wrapped by an SSRProvider', () => {
    const { result } = renderHook(() => useIsInSSRContext());
    expect(result.current).toBe(false);
  });
});
