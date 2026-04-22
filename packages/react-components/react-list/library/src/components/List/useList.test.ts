import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useList_unstable } from './useList';

describe('useList_unstable', () => {
  let ref: React.RefObject<HTMLDivElement | HTMLUListElement | HTMLOListElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLDivElement | HTMLUListElement | HTMLOListElement>();
  });

  it('returns default state for non-selectable list', () => {
    const { result } = renderHook(() => useList_unstable({}, ref));

    expect(result.current).toMatchObject({
      components: {
        root: 'ul',
      },
      root: expect.objectContaining({
        ref,
        role: 'list',
      }),
      listItemRole: 'listitem',
      navigationMode: undefined,
      selection: undefined,
    });
  });

  it('returns selection state and listbox role when selectionMode is enabled', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderHook(() =>
      useList_unstable(
        {
          selectionMode: 'single',
          onSelectionChange,
        },
        ref,
      ),
    );

    expect(result.current.root).toMatchObject({
      role: 'listbox',
    });
    expect(result.current.selection).toBeDefined();

    act(() => {
      result.current.selection?.toggleItem({} as React.SyntheticEvent, 'item-1');
    });

    expect(result.current.selection?.selectedItems).toEqual(['item-1']);
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'change',
        selectedItems: ['item-1'],
      }),
    );
  });

  it('uses div root and grid roles in composite navigation mode', () => {
    const { result } = renderHook(() => useList_unstable({ navigationMode: 'composite' }, ref));

    expect(result.current).toMatchObject({
      components: {
        root: 'div',
      },
      root: expect.objectContaining({
        role: 'grid',
      }),
      listItemRole: 'row',
      navigationMode: 'composite',
    });
  });

  it('respects an explicit as prop in returned root component', () => {
    const { result } = renderHook(() => useList_unstable({ as: 'ol' }, ref));

    expect(result.current.components.root).toBe('ol');
    expect(result.current.root.role).toBe('list');
  });
});
