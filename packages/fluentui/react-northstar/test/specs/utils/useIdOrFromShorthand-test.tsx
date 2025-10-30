import { renderHook } from '@testing-library/react';
import * as React from 'react';

import { useIdOrFromShorthand } from 'src/utils';

describe('useIdOrFromShorthand', () => {
  it('uses ID from React element', () => {
    const { result } = renderHook(() => useIdOrFromShorthand(<div id="foo" />));

    expect(result.current).toBe('foo');
  });

  it('uses ID from a shorthand', () => {
    const { result } = renderHook(() => useIdOrFromShorthand({ id: 'foo' }));

    expect(result.current).toBe('foo');
  });

  it('falls back to React.useId()', () => {
    const { result } = renderHook(() => useIdOrFromShorthand({ children: 'foo' }));

    expect(typeof result.current).toBe('string');
    expect(result.current).toMatch(/^:r/);
  });
});
