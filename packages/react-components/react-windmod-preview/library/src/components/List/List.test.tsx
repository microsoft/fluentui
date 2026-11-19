import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ListItem } from '../ListItem';
import { List } from './List';
import { listClassNames, useListStyles } from './useListStyles';
import type { ListState } from './List.types';

import styles from './List.module.css';

jest.mock('@fluentui/react-headless-components-preview/list', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/list');
  const { deepFreezeState } = require('../../testing/freezeState');
  return {
    ...actual,
    useList: (...args: Parameters<typeof actual.useList>) => deepFreezeState(actual.useList(...args)),
  };
});

describe('List', () => {
  isConformant({ Component: List, displayName: 'List' });

  it.each(['ul', 'ol', 'div'] as const)('preserves the %s root, ref and consumer classes', as => {
    const ref = React.createRef<HTMLUListElement & HTMLOListElement & HTMLDivElement>();
    const { getByRole } = render(
      <List as={as} ref={ref} className="consumer">
        <ListItem as={as === 'div' ? 'div' : 'li'}>One</ListItem>
      </List>,
    );
    const root = getByRole('list');
    expect(root.tagName.toLowerCase()).toBe(as);
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('fui-list', 'group/fui-list', styles.root);
    expect(root.classList[0]).toBe('fui-list');
    expect(root.className.endsWith('consumer')).toBe(true);
    expect(listClassNames.root).toBe('fui-list group/fui-list');
    expect(root).toHaveAttribute('data-list');
  });

  it('retains headless item-navigation and selection attributes', () => {
    const { getByRole } = render(
      <List navigationMode="items" selectionMode="multiselect">
        <ListItem>One</ListItem>
      </List>,
    );
    expect(getByRole('listbox')).toHaveAttribute('focusgroup', 'toolbar block');
    expect(getByRole('listbox')).toHaveAttribute('data-navigation-mode', 'items');
    expect(getByRole('listbox')).toHaveAttribute('data-selectable');
  });

  it('keeps a controlled selection unchanged until the caller updates it', () => {
    const onSelectionChange = jest.fn();
    const content = (selectedItems: string[]) => (
      <List selectionMode="single" selectedItems={selectedItems} onSelectionChange={onSelectionChange}>
        <ListItem value="one">One</ListItem>
        <ListItem value="two">Two</ListItem>
      </List>
    );
    const { getAllByRole, rerender } = render(content(['one']));
    fireEvent.click(getAllByRole('option')[1]);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange.mock.calls[0][1].selectedItems).toEqual(['two']);
    expect(getAllByRole('checkbox')[0]).toBeChecked();
    expect(getAllByRole('checkbox')[1]).not.toBeChecked();
    rerender(content(['two']));
    expect(getAllByRole('checkbox')[1]).toBeChecked();
    expect(getAllByRole('option')[1]).toHaveAttribute('data-selected');
  });

  it('preserves the caller click boundary around a nested selectable list', () => {
    const { getAllByRole } = render(
      <List selectionMode="multiselect" navigationMode="composite">
        <ListItem value="outer">
          <span role="gridcell">
            Outer
            <List selectionMode="multiselect" onClick={event => event.stopPropagation()}>
              <ListItem value="inner">Inner</ListItem>
            </List>
          </span>
        </ListItem>
      </List>,
    );
    fireEvent.click(getAllByRole('checkbox')[1]);
    expect(getAllByRole('checkbox')[1]).toBeChecked();
    expect(getAllByRole('checkbox')[0]).not.toBeChecked();
  });

  it('copies the root while preserving context and navigation state', () => {
    const state = Object.freeze({
      root: Object.freeze({ className: 'consumer' }),
      components: Object.freeze({ root: 'ul' }),
      navigationMode: 'items',
      listItemRole: 'listitem',
    }) as ListState;
    const styled = useListStyles(state);
    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.navigationMode).toBe('items');
  });
});
