/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SSRProvider, useIsSSR } from './SSRContext';

describe('useIsSSR (node)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns "false" and logs an error if is used outside of SSRProvider', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    const { result } = renderHookSSR(() => useIsSSR());

    expect(error).toHaveBeenCalledWith(expect.stringMatching(/When server rendering, you must wrap your application/));
    expect(result.current).toBe(false);
  });

  it('returns "true" if is inside SSRProvider', () => {
    const { result } = renderHookSSR(() => useIsSSR(), { wrapper: SSRProvider });

    expect(result.current).toBe(true);
  });
});

// Minimal SSR-only renderHook replacement using react-dom/server
function renderHookSSR<T>(
  callback: () => T,
  options?: { wrapper?: React.ComponentType<{ children: React.ReactNode }> },
) {
  const result: { current: T | undefined } = { current: undefined };

  const Probe: React.FC = () => {
    result.current = callback();
    return null;
  };

  const element = options?.wrapper ? (
    <options.wrapper>
      <Probe />
    </options.wrapper>
  ) : (
    <Probe />
  );

  renderToString(element);

  return { result };
}
