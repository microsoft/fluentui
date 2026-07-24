import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTreeItem_unstable } from './useTreeItem';
import { useTreeItemContextValues_unstable } from './useTreeItemContextValues';

describe('useTreeItem_unstable', () => {
  let ref: React.RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLDivElement>();
  });

  it('returns default state with div root element', () => {
    const { result } = renderHook(() => useTreeItem_unstable({ value: 'item-1', itemType: 'leaf' }, ref));

    expect(result.current).toMatchObject({
      components: { root: 'div' },
      itemType: 'leaf',
      value: 'item-1',
    });
  });

  it('reflects branch itemType in state', () => {
    const { result } = renderHook(() => useTreeItem_unstable({ value: 'item-1', itemType: 'branch' }, ref));

    expect(result.current.itemType).toBe('branch');
  });

  it('reflects value prop in state', () => {
    const { result } = renderHook(() => useTreeItem_unstable({ value: 'custom-value', itemType: 'leaf' }, ref));

    expect(result.current.value).toBe('custom-value');
  });

  it('defaults open to false for leaf items', () => {
    const { result } = renderHook(() => useTreeItem_unstable({ value: 'item-1', itemType: 'leaf' }, ref));

    expect(result.current.open).toBe(false);
  });
});

describe('useTreeItemContextValues_unstable', () => {
  let ref: React.RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLDivElement>();
  });

  it('returns treeItem context with value and itemType', () => {
    const { result } = renderHook(() => {
      const state = useTreeItem_unstable({ value: 'item-1', itemType: 'leaf' }, ref);
      return useTreeItemContextValues_unstable(state);
    });

    expect(result.current.treeItem).toMatchObject({
      value: 'item-1',
      itemType: 'leaf',
    });
  });

  it('reflects open state in treeItem context', () => {
    const { result } = renderHook(() => {
      const state = useTreeItem_unstable({ value: 'item-1', itemType: 'branch', open: true }, ref);
      return useTreeItemContextValues_unstable(state);
    });

    expect(result.current.treeItem.open).toBe(true);
  });
});
