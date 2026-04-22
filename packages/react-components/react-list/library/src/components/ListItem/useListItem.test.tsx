import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Space } from '@fluentui/keyboard-keys';

import { useListItem_unstable } from './useListItem';
import { ListContextProvider, ListSynchronousContextProvider } from '../List/listContext';
import type { ListContextValue, ListSynchronousContextValue } from '../List/List.types';
import type { ListSelectionState } from '../../hooks/types';

describe('useListItem_unstable', () => {
  let ref: React.RefObject<HTMLLIElement | HTMLDivElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLLIElement | HTMLDivElement>();
  });

  it('returns default state when list context is not provided', () => {
    const { result } = renderHook(() => useListItem_unstable({}, ref));

    expect(result.current).toMatchObject({
      components: {
        root: 'li',
      },
      root: expect.objectContaining({
        role: 'listitem',
      }),
      selectable: false,
      navigable: false,
      checkmark: undefined,
    });
  });

  it('uses div root and row role in composite navigation mode', () => {
    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
      const listContextValue: ListContextValue = {
        selection: undefined,
        validateListItem: jest.fn(),
      };
      const syncContextValue: ListSynchronousContextValue = {
        navigationMode: 'composite',
        listItemRole: 'row',
      };

      return (
        <ListContextProvider value={listContextValue}>
          <ListSynchronousContextProvider value={syncContextValue}>{children}</ListSynchronousContextProvider>
        </ListContextProvider>
      );
    };

    const { result } = renderHook(() => useListItem_unstable({}, ref), { wrapper });

    expect(result.current).toMatchObject({
      components: {
        root: 'div',
      },
      root: expect.objectContaining({
        role: 'row',
      }),
      navigable: true,
    });
  });

  it('respects an explicit as prop in returned root component', () => {
    const { result } = renderHook(() => useListItem_unstable({ as: 'li' }, ref));

    expect(result.current.components.root).toBe('li');
  });

  it('returns selectable state and toggles selection with keyboard action', () => {
    const toggleItem = jest.fn();
    const selection: ListSelectionState = {
      isSelected: () => true,
      toggleItem,
      deselectItem: jest.fn(),
      selectItem: jest.fn(),
      clearSelection: jest.fn(),
      toggleAllItems: jest.fn(),
      setSelectedItems: jest.fn(),
      selectedItems: ['item-1'],
    };

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
      const listContextValue: ListContextValue = {
        selection,
        validateListItem: jest.fn(),
      };
      const syncContextValue: ListSynchronousContextValue = {
        navigationMode: 'items',
        listItemRole: 'option',
      };

      return (
        <ListContextProvider value={listContextValue}>
          <ListSynchronousContextProvider value={syncContextValue}>{children}</ListSynchronousContextProvider>
        </ListContextProvider>
      );
    };

    const { result } = renderHook(() => useListItem_unstable({ value: 'item-1' }, ref), { wrapper });

    expect(result.current).toMatchObject({
      selectable: true,
      navigable: true,
      root: expect.objectContaining({
        role: 'option',
        'aria-selected': true,
      }),
      checkmark: expect.objectContaining({
        checked: true,
      }),
    });

    const target = document.createElement('div');
    const event = {
      key: Space,
      target,
      currentTarget: target,
      preventDefault: jest.fn(),
      defaultPrevented: false,
    } as unknown as React.KeyboardEvent<HTMLLIElement> & React.KeyboardEvent<HTMLDivElement>;

    act(() => {
      result.current.root.onKeyDown?.(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(toggleItem).toHaveBeenCalledWith(event, 'item-1');
  });
});
