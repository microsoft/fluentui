import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { IdPrefixProvider, resetIdsForTests, useId } from './useId';

describe('useId', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('uses prefix', () => {
    const { result } = renderHook(() => useId('foo'));

    expect(result.current).toBeDefined();
    expect(result.current).toMatch(/^foo/);
  });

  it('defaults to "fui-" when prefix is not specified', () => {
    const { result } = renderHook(() => useId());

    expect(result.current).toMatch(/^fui-/);
  });

  it('uses the same ID without prefix', () => {
    const { result, rerender } = renderHook(() => useId());
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('uses the same ID with prefix', () => {
    const { result, rerender } = renderHook(() => useId('foo'));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('consumers prefix from a context', () => {
    const { result } = renderHook(() => useId(), {
      wrapper: ({ children }) => <IdPrefixProvider value="scope-">{children}</IdPrefixProvider>,
    });

    expect(result.current).toMatch(/^scope-fui-/);
  });
});
