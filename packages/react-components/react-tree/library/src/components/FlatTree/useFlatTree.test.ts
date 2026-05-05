import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFlatTree_unstable } from './useFlatTree';
import { useFlatTreeContextValues_unstable } from './useFlatTreeContextValues';

describe('useFlatTree_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns default state with div root element', () => {
    const { result } = renderHook(() => useFlatTree_unstable({}, ref));

    expect(result.current).toMatchObject({
      components: { root: 'div' },
      contextType: 'root',
      level: 1,
    });
  });

  it('reflects size prop in state', () => {
    const { result } = renderHook(() => useFlatTree_unstable({ size: 'small' }, ref));

    expect(result.current.size).toBe('small');
  });

  it('reflects appearance prop in state', () => {
    const { result } = renderHook(() => useFlatTree_unstable({ appearance: 'subtle' }, ref));

    expect(result.current.appearance).toBe('subtle');
  });

  it('reflects selectionMode prop in state', () => {
    const { result } = renderHook(() => useFlatTree_unstable({ selectionMode: 'multiselect' }, ref));

    expect(result.current.selectionMode).toBe('multiselect');
  });

  it('defaults navigationMode to tree', () => {
    const { result } = renderHook(() => useFlatTree_unstable({}, ref));

    expect(result.current.navigationMode).toBe('tree');
  });
});

describe('useFlatTreeContextValues_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns tree context with root contextType', () => {
    const { result } = renderHook(() => {
      const state = useFlatTree_unstable({}, ref);
      return useFlatTreeContextValues_unstable(state);
    });

    expect(result.current.tree).toMatchObject({
      contextType: 'root',
      level: 1,
    });
  });

  it('reflects selectionMode in tree context', () => {
    const { result } = renderHook(() => {
      const state = useFlatTree_unstable({ selectionMode: 'single' }, ref);
      return useFlatTreeContextValues_unstable(state);
    });

    expect(result.current.tree.selectionMode).toBe('single');
  });

  it('reflects size in tree context', () => {
    const { result } = renderHook(() => {
      const state = useFlatTree_unstable({ size: 'small' }, ref);
      return useFlatTreeContextValues_unstable(state);
    });

    expect(result.current.tree.size).toBe('small');
  });
});
