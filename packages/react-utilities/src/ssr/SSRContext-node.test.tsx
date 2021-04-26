/**
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { renderHook } from '@testing-library/react-hooks';
import { SSRProvider, useIsSSR } from './SSRContext';

describe('useIsSSR', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs an error if is used outside of SSRProvider', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    const { result } = renderHook(() => useIsSSR());

    expect(error).toHaveBeenCalledWith(expect.stringMatching(/When server rendering, you must wrap your application/));
    expect(result.current).toBe(true);
  });

  it('returns "true" in SSR env', () => {
    const { result } = renderHook(() => useIsSSR(), { wrapper: SSRProvider });

    expect(result.current).toBe(true);
  });
});
