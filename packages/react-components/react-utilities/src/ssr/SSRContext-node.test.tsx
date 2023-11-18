/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import { renderHook } from '@testing-library/react-hooks';
import { SSRProvider, useIsSSR } from './SSRContext';

describe('useIsSSR (node)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns "false" and logs an error if is used outside of SSRProvider', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    const { result } = renderHook(() => useIsSSR());

    expect(error).toHaveBeenCalledWith(expect.stringMatching(/When server rendering, you must wrap your application/));
    expect(result.current).toBe(false);
  });

  it('returns "true" if is inside SSRProvider', () => {
    const { result } = renderHook(() => useIsSSR(), { wrapper: SSRProvider });

    expect(result.current).toBe(true);
  });
});
