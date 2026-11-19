import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { List } from '../List';
import { ListItem } from './ListItem';
import { listItemClassNames, useListItemStyles } from './useListItemStyles';
import type { ListItemState } from './ListItem.types';

import styles from './ListItem.module.css';

jest.mock('@fluentui/react-headless-components-preview/list', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/list');
  const { deepFreezeState } = require('../../testing/freezeState');
  return {
    ...actual,
    useListItem: (...args: Parameters<typeof actual.useListItem>) => deepFreezeState(actual.useListItem(...args)),
  };
});

describe('ListItem', () => {
  isConformant({ Component: ListItem, displayName: 'ListItem' });

  it('keeps the root marker, module, ref and last consumer class', () => {
    const ref = React.createRef<HTMLLIElement>();
    const { getByRole } = render(
      <List>
        <ListItem ref={ref} className="consumer">
          One
        </ListItem>
      </List>,
    );
    const root = getByRole('listitem');
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('fui-list-item', 'group/fui-list-item', styles.root);
    expect(root.classList[0]).toBe('fui-list-item');
    expect(root.className.endsWith('consumer')).toBe(true);
    expect(listItemClassNames.root).toBe('fui-list-item group/fui-list-item');
    expect(root).not.toHaveAttribute('data-selectable');
  });

  it('forwards native checkmark props and ref to the input and toggles only once', () => {
    const ref = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onAction = jest.fn();
    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem
          value="one"
          onAction={onAction}
          checkmark={{
            ref,
            onChange,
            name: 'choice',
            value: 'one',
            'aria-label': 'Choose one',
            className: 'input-consumer',
            style: { opacity: 0.5 },
          }}
        >
          One
        </ListItem>
      </List>,
    );
    const input = getByRole('checkbox');
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('name', 'choice');
    expect(input).toHaveAttribute('value', 'one');
    expect(input).toHaveAttribute('aria-label', 'Choose one');
    expect(input.className.endsWith('input-consumer')).toBe(true);
    expect(input).toHaveStyle({ opacity: 0.5 });
    expect(input.parentElement).toHaveClass('fui-checkbox', styles.checkmark);
    fireEvent.click(input);
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
    expect(input.parentElement).toHaveAttribute('data-checked');
    expect(input.parentElement?.querySelector('[data-fui-icon]')).not.toBeNull();
  });

  it('can remove or explicitly render the native checkmark slot', () => {
    const { queryByRole, rerender } = render(
      <List selectionMode="single">
        <ListItem checkmark={null}>One</ListItem>
      </List>,
    );
    expect(queryByRole('checkbox')).toBeNull();
    rerender(
      <List>
        <ListItem checkmark={{ checked: true, readOnly: true }}>One</ListItem>
      </List>,
    );
    expect(queryByRole('checkbox')).toBeChecked();
    expect(queryByRole('checkbox')?.parentElement).toHaveAttribute('data-checked');
  });

  it.each([false, true])('preserves disabled selection with an action: %s', actionable => {
    const onAction = jest.fn();
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem disabledSelection onAction={actionable ? onAction : undefined}>
          One
        </ListItem>
      </List>,
    );
    const row = getByRole('option');
    expect(getByRole('checkbox')).toBeDisabled();
    expect(row.hasAttribute('data-disabled')).toBe(!actionable);
    fireEvent.click(row);
    fireEvent.keyDown(row, { key: ' ' });
    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(onAction).toHaveBeenCalledTimes(actionable ? 1 : 0);
  });

  it('runs row actions and native input cancellation without duplicate selection', () => {
    const onAction = jest.fn();
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem onAction={onAction} checkmark={{ onChange: event => event.preventDefault() }}>
          One
        </ListItem>
      </List>,
    );
    fireEvent.click(getByRole('checkbox'));
    expect(onSelectionChange).not.toHaveBeenCalled();
    fireEvent.keyDown(getByRole('option'), { key: 'Enter' });
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(getByRole('option'), { key: ' ' });
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it('keeps composite grid cells and editable-child keyboard boundaries', () => {
    const { getAllByRole, getByRole } = render(
      <List navigationMode="composite" selectionMode="multiselect">
        <ListItem value="one">
          <span role="gridcell">
            <input aria-label="Edit" />
          </span>
        </ListItem>
        <ListItem value="two">
          <span role="gridcell">
            <button>Action</button>
          </span>
        </ListItem>
      </List>,
    );
    const rows = getAllByRole('row');
    expect(rows[0].tagName).toBe('DIV');
    expect(getAllByRole('checkbox')[0].closest('[role="gridcell"]')).not.toBeNull();
    const editor = getByRole('textbox');
    editor.focus();
    fireEvent.keyDown(editor, { key: 'ArrowDown' });
    expect(editor).toHaveFocus();
    rows[0].focus();
    fireEvent.keyDown(rows[0], { key: 'ArrowDown' });
    expect(rows[1]).toHaveFocus();
    fireEvent.keyDown(rows[1], { key: 'ArrowRight' });
    expect(getByRole('button')).toHaveFocus();
    fireEvent.keyDown(getByRole('button'), { key: 'Escape' });
    expect(rows[1]).toHaveFocus();
  });

  it('copies frozen state and leaves an absent checkmark absent', () => {
    const state = Object.freeze({
      components: Object.freeze({ root: 'li', checkmark: 'input' }),
      root: Object.freeze({ className: 'consumer' }),
      selectable: false,
      navigable: false,
    }) as ListItemState;
    const styled = useListItemStyles(state);
    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.checkmark).toBeUndefined();
  });
});
