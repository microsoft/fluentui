/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { useAnimateAtoms } from './useAnimateAtoms';

describe('useAnimateAtoms (node)', () => {
  it('handles node/server environments', () => {
    const { result } = renderHookSSR(() => useAnimateAtoms());

    expect(result.current).toBeInstanceOf(Function);
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
