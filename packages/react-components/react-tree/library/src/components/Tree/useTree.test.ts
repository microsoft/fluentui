import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTree_unstable } from './useTree';
import { useTreeContextValues_unstable } from './useTreeContextValues';

describe('useTree_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns default state with div root element', () => {
    const { result } = renderHook(() => useTree_unstable({}, ref));

    expect(result.current).toMatchObject({
      components: { root: 'div' },
      contextType: 'root',
      level: 1,
    });
  });

  it('reflects size prop in state', () => {
    const { result } = renderHook(() => useTree_unstable({ size: 'small' }, ref));

    expect(result.current.size).toBe('small');
  });

  it('reflects appearance prop in state', () => {
    const { result } = renderHook(() => useTree_unstable({ appearance: 'subtle-alpha' }, ref));

    expect(result.current.appearance).toBe('subtle-alpha');
  });

  it('reflects selectionMode prop in state', () => {
    const { result } = renderHook(() => useTree_unstable({ selectionMode: 'multiselect' }, ref));

    expect(result.current.selectionMode).toBe('multiselect');
  });

  it('defaults navigationMode to tree', () => {
    const { result } = renderHook(() => useTree_unstable({}, ref));

    expect(result.current.navigationMode).toBe('tree');
  });

  it('reflects navigationMode prop in state', () => {
    const { result } = renderHook(() => useTree_unstable({ navigationMode: 'treegrid' }, ref));

    expect(result.current.navigationMode).toBe('treegrid');
  });
});

describe('useTreeContextValues_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns tree context with root contextType', () => {
    const { result } = renderHook(() => {
      const state = useTree_unstable({}, ref);
      return useTreeContextValues_unstable(state);
    });

    expect(result.current.tree).toMatchObject({
      contextType: 'root',
      level: 1,
    });
  });

  it('reflects selectionMode in tree context', () => {
    const { result } = renderHook(() => {
      const state = useTree_unstable({ selectionMode: 'single' }, ref);
      return useTreeContextValues_unstable(state);
    });

    expect(result.current.tree.selectionMode).toBe('single');
  });

  it('reflects appearance in tree context', () => {
    const { result } = renderHook(() => {
      const state = useTree_unstable({ appearance: 'transparent' }, ref);
      return useTreeContextValues_unstable(state);
    });

    expect(result.current.tree.appearance).toBe('transparent');
  });
});
