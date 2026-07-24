import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTable_unstable } from './useTable';

describe('useTable_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns default state with table element and medium size', () => {
    const { result } = renderHook(() => useTable_unstable({}, ref));

    expect(result.current).toMatchObject({
      components: { root: 'table' },
      root: expect.objectContaining({ ref }),
      size: 'medium',
      noNativeElements: false,
      sortable: false,
    });
  });

  it('renders as div with role="table" when noNativeElements is true', () => {
    const { result } = renderHook(() => useTable_unstable({ noNativeElements: true }, ref));

    expect(result.current.components.root).toBe('div');
    expect(result.current.root).toMatchObject({ role: 'table' });
    expect(result.current.noNativeElements).toBe(true);
  });

  it('respects explicit as prop', () => {
    const { result } = renderHook(() => useTable_unstable({ as: 'div' }, ref));

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.root).toBe('div');
  });

  it('passes size prop through to state', () => {
    const { result } = renderHook(() => useTable_unstable({ size: 'small' }, ref));

    expect(result.current.size).toBe('small');
  });

  it('reflects sortable prop in state', () => {
    const { result } = renderHook(() => useTable_unstable({ sortable: true }, ref));

    expect(result.current.sortable).toBe(true);
  });
});
