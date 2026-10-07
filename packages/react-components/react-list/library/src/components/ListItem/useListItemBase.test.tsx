/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { assertSlots, resetIdsForTests } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { GroupperMoveFocusEventName, MoverMoveFocusEventName } from '@fluentui/react-tabster';
import type { ListProps } from '../List/List.types';
import { renderList_unstable } from '../List/renderList';
import { useListBase_unstable } from '../List/useList';
import { useListContextValues_unstable } from '../List/useListContextValues';
import type { ListItemBaseProps, ListItemBaseSlots } from './ListItem.types';
import { useListItemBase_unstable } from './useListItem';

const BaseList: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useListBase_unstable(props, ref);
  return renderList_unstable(state, useListContextValues_unstable(state));
});

const BaseListItem: ForwardRefComponent<ListItemBaseProps> = React.forwardRef((props, ref) => {
  const state = useListItemBase_unstable(props, ref);
  assertSlots<ListItemBaseSlots>(state);
  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.root.children}
    </state.root>
  );
});

describe('useListItemBase_unstable', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('renders and validates explicit ordered-list and list-item roots', () => {
    const { getByRole } = render(
      <BaseList as="ol">
        <BaseListItem as="li">Item</BaseListItem>
      </BaseList>,
    );

    expect(getByRole('list').tagName).toBe('OL');
    expect(getByRole('listitem').tagName).toBe('LI');
  });

  it('renders an unstyled native checkbox and forwards both refs', () => {
    const rootRef = React.createRef<HTMLLIElement>();
    const checkmarkRef = React.createRef<HTMLInputElement>();
    const { getByRole } = render(
      <BaseList selectionMode="single" defaultSelectedItems={['item']}>
        <BaseListItem value="item" ref={rootRef} checkmark={{ ref: checkmarkRef, 'aria-label': 'Select item' }}>
          Item
        </BaseListItem>
      </BaseList>,
    );
    const list = getByRole('listbox');
    const item = getByRole('option');
    const checkbox = getByRole('checkbox');

    expect(rootRef.current).toBe(item);
    expect(checkmarkRef.current).toBe(checkbox);
    expect(checkbox.tagName).toBe('INPUT');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('tabindex', '-1');
    expect(item).toHaveAttribute('aria-selected', 'true');
    expect(list).not.toHaveAttribute('data-tabster');
    expect(item).not.toHaveAttribute('data-tabster');
    expect(item).not.toHaveAttribute('class');
    expect(checkbox).not.toHaveAttribute('class');
  });

  it.each([' ', 'Enter'])('keeps the primary action on %j without selection', key => {
    const onAction = jest.fn();
    const { getByRole } = render(<BaseListItem onAction={onAction}>Item</BaseListItem>);

    fireEvent.keyDown(getByRole('listitem'), { key });

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it.each([' ', 'Enter'])('keeps selection on %j', key => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <BaseList selectionMode="multiselect">
        <BaseListItem value="item" onAction={onAction}>
          Item
        </BaseListItem>
      </BaseList>,
    );
    const item = getByRole('option');

    fireEvent.keyDown(item, { key });

    expect(item).toHaveAttribute('aria-selected', 'true');
    expect(onAction).toHaveBeenCalledTimes(key === 'Enter' ? 1 : 0);
  });

  it('allows a custom primary action to prevent selection without preventing Space selection', () => {
    const onAction = jest.fn(event => event.preventDefault());
    const { getByRole } = render(
      <BaseList selectionMode="multiselect">
        <BaseListItem value="item" onAction={onAction}>
          Item
        </BaseListItem>
      </BaseList>,
    );
    const item = getByRole('option');

    fireEvent.keyDown(item, { key: 'Enter' });
    expect(item).toHaveAttribute('aria-selected', 'false');
    expect(onAction).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(item, { key: ' ' });
    expect(item).toHaveAttribute('aria-selected', 'true');
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('toggles selection once without triggering an action on checkbox click', () => {
    const onAction = jest.fn();
    const onSelectionChange = jest.fn();
    const onCheckmarkChange = jest.fn();
    const { getByRole } = render(
      <BaseList selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <BaseListItem value="item" onAction={onAction} checkmark={{ onChange: onCheckmarkChange }}>
          Item
        </BaseListItem>
      </BaseList>,
    );

    fireEvent.click(getByRole('checkbox'));

    expect(getByRole('option')).toHaveAttribute('aria-selected', 'true');
    expect(onCheckmarkChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it('allows the native checkmark handler to prevent selection', () => {
    const { getByRole } = render(
      <BaseList selectionMode="multiselect">
        <BaseListItem value="item" checkmark={{ onChange: event => event.preventDefault() }}>
          Item
        </BaseListItem>
      </BaseList>,
    );

    fireEvent.click(getByRole('checkbox'));

    expect(getByRole('option')).toHaveAttribute('aria-selected', 'false');
  });

  it('preserves disabled selection while still allowing a primary action', () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <BaseList selectionMode="multiselect">
        <BaseListItem value="item" disabledSelection onAction={onAction}>
          Item
        </BaseListItem>
      </BaseList>,
    );
    const item = getByRole('option');

    expect(getByRole('checkbox')).toBeDisabled();
    fireEvent.keyDown(item, { key: ' ' });
    fireEvent.keyDown(item, { key: 'Enter' });

    expect(item).toHaveAttribute('aria-selected', 'false');
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('leaves arrow keys from nested controls to consumer focus management', () => {
    const onKeyDown = jest.fn();
    const onAction = jest.fn();
    const { getByRole } = render(
      <BaseListItem onKeyDown={onKeyDown} onAction={onAction}>
        <button>Secondary action</button>
      </BaseListItem>,
    );
    const button = getByRole('button');
    const groupperMoveFocus = jest.fn();
    const moverMoveFocus = jest.fn();
    button.addEventListener(GroupperMoveFocusEventName, groupperMoveFocus);
    getByRole('listitem').addEventListener(MoverMoveFocusEventName, moverMoveFocus);

    fireEvent.keyDown(button, { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].defaultPrevented).toBe(false);
    expect(onAction).not.toHaveBeenCalled();
    expect(groupperMoveFocus).not.toHaveBeenCalled();
    expect(moverMoveFocus).not.toHaveBeenCalled();
  });
});
