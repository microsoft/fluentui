import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { ListContextProvider, ListSynchronousContextProvider } from '../List/listContext';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';
import { useListItemBase_unstable } from './useListItem';

describe('ListItem', () => {
  isConformant<ListItemProps>({
    Component: ListItem as React.FunctionComponent<ListItemProps>,
    displayName: 'ListItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            checkmark: { renderByDefault: true },
          },
        },
      ],
    },
  });

  describe('useListItemBase_unstable', () => {
    const selection = {
      isSelected: (id: string | number) => id === 'item-1',
      toggleItem: jest.fn(),
      deselectItem: jest.fn(),
      selectItem: jest.fn(),
      clearSelection: jest.fn(),
      toggleAllItems: jest.fn(),
      setSelectedItems: jest.fn(),
      selectedItems: ['item-1'],
    };

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ListContextProvider value={{ selection, validateListItem: jest.fn() }}>
        <ListSynchronousContextProvider value={{ navigationMode: undefined, listItemRole: 'option' }}>
          {children}
        </ListSynchronousContextProvider>
      </ListContextProvider>
    );

    it('uses the native checkbox and preserves selection semantics in headless mode', () => {
      const ref = React.createRef<HTMLLIElement | HTMLDivElement>();
      const { result } = renderHook(() => useListItemBase_unstable({ value: 'item-1' }, ref), { wrapper });

      expect(result.current.root).toMatchObject({
        role: 'option',
        id: 'item-1',
      });
      expect(result.current.root.tabIndex).toBe(0);
      expect(result.current.root['aria-selected']).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.checkmark).toBe('input');
      expect(result.current.checkmark).toMatchObject({ type: 'checkbox', checked: true, tabIndex: -1 });
      expect(result.current.root).not.toHaveProperty('data-tabster');
    });
  });

  it('renders a default state', () => {
    const result = render(<ListItem>Default ListItem</ListItem>);
    expect(result.container).toMatchSnapshot();
  });

  it('does not trigger an action when an explicit checkmark is clicked without selection', () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <ListItem onAction={onAction} checkmark={{ 'aria-label': 'Checkmark' }}>
        Item
      </ListItem>,
    );

    fireEvent.click(getByRole('checkbox'));

    expect(onAction).not.toHaveBeenCalled();
  });
});
