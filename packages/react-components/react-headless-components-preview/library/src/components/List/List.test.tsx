import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import { ListItem } from './ListItem/ListItem';

describe('List', () => {
  isConformant({
    Component: List,
    displayName: 'List',
  });

  it('renders a default state', () => {
    const { getByRole, getAllByRole } = render(
      <List>
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    expect(getByRole('list').tagName).toBe('UL');
    expect(getAllByRole('listitem')).toHaveLength(2);
    expect(getAllByRole('listitem')[0].tagName).toBe('LI');
  });

  it('does not set navigation or selection data attributes by default', () => {
    const { getByRole } = render(
      <List>
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    expect(getByRole('list')).not.toHaveAttribute('data-navigation-mode');
    expect(getByRole('list')).not.toHaveAttribute('data-selectable');
  });

  it.each(['items', 'composite'] as const)('sets data-navigation-mode to %s', navigationMode => {
    const { container } = render(
      <List navigationMode={navigationMode}>
        <ListItem value="one">
          {navigationMode === 'composite' ? (
            <span role="gridcell">
              <button>First item</button>
            </span>
          ) : (
            'First item'
          )}
        </ListItem>
      </List>,
    );

    expect(container.firstElementChild).toHaveAttribute('data-navigation-mode', navigationMode);
  });

  it('sets data-selectable and the listbox semantics when selection is enabled', () => {
    const { getByRole, getAllByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    const list = getByRole('listbox');

    expect(list).toHaveAttribute('data-selectable', '');
    expect(list).toHaveAttribute('aria-multiselectable', 'true');
    expect(getAllByRole('option')).toHaveLength(2);
  });

  it('renders a native checkbox as the checkmark slot', () => {
    const { getAllByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    const checkbox = getAllByRole('checkbox')[0];

    expect(checkbox.tagName).toBe('INPUT');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox.closest('.fui-Checkbox')).toBeNull();
  });

  it('preserves an explicit ordered-list root and item semantics', () => {
    const { getByRole } = render(
      <List as="ol">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    expect(getByRole('list').tagName).toBe('OL');
    expect(getByRole('listitem').tagName).toBe('LI');
  });

  it('does not include Tabster attributes or Fluent styling', () => {
    const { container, getByRole } = render(
      <List navigationMode="items">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    expect(getByRole('list')).toHaveAttribute('focusgroup', 'toolbar block');
    expect(container.querySelector('[data-tabster]')).toBeNull();
    expect(container.querySelector('[class]')).toBeNull();
  });

  it('selects and deselects an item in multiselect mode', () => {
    const onSelectionChange = jest.fn();

    const { getAllByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    const [first] = getAllByRole('option');

    expect(first).toHaveAttribute('aria-selected', 'false');
    expect(first).not.toHaveAttribute('data-selected');

    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(first).toHaveAttribute('data-selected', '');
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedItems: ['one'] }),
    );

    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-selected', 'false');
    expect(first).not.toHaveAttribute('data-selected');
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedItems: [] }),
    );
  });

  it('supports controlled selection', () => {
    const { getAllByRole, rerender } = render(
      <List selectionMode="single" selectedItems={['one']}>
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    const [first, second] = getAllByRole('option');
    expect(first).toHaveAttribute('data-selected', '');
    expect(second).not.toHaveAttribute('data-selected');

    // Controlled state ignores the click until the consumer updates the prop.
    fireEvent.click(second);
    expect(first).toHaveAttribute('data-selected', '');

    rerender(
      <List selectionMode="single" selectedItems={['two']}>
        <ListItem value="one">First item</ListItem>
        <ListItem value="two">Second item</ListItem>
      </List>,
    );

    expect(getAllByRole('option')[0]).not.toHaveAttribute('data-selected');
    expect(getAllByRole('option')[1]).toHaveAttribute('data-selected', '');
  });

  it('does not let a consumer misrepresent the reserved selection attribute', () => {
    const { getByRole } = render(
      <List data-selectable="nope">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    expect(getByRole('list')).not.toHaveAttribute('data-selectable');
  });

  it.each(['single', 'multiselect'] as const)(
    'has no accessibility violations with populated %s selection',
    async selectionMode => {
      const { baseElement } = render(
        <List aria-label="Items" selectionMode={selectionMode}>
          <ListItem value="one" checkmark={null}>
            First item
          </ListItem>
          <ListItem value="two" checkmark={null}>
            Second item
          </ListItem>
        </List>,
      );

      expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
    },
  );

  it('has no accessibility violations with populated composite actions', async () => {
    const { baseElement } = render(
      <List aria-label="People actions" navigationMode="composite">
        <ListItem value="alex">
          <span role="gridcell">Alex</span>
          <span role="gridcell">
            <button aria-label="Edit Alex">Edit</button>
            <button aria-label="More options for Alex">More</button>
          </span>
        </ListItem>
      </List>,
    );

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('has no accessibility violations with named native checkmarks in a composite grid', async () => {
    const { baseElement } = render(
      <List aria-label="People actions" navigationMode="composite" selectionMode="multiselect">
        <ListItem value="alex" checkmark={{ 'aria-label': 'Select Alex' }}>
          <span role="gridcell">Alex</span>
          <span role="gridcell">
            <button aria-label="Edit Alex">Edit</button>
          </span>
        </ListItem>
      </List>,
    );

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('keeps nested lists outside the composite focus order', () => {
    const { getByRole } = render(
      <List aria-label="Outer" navigationMode="composite">
        <ListItem value="outer">
          <span role="gridcell">
            <List aria-label="Inner" selectionMode="multiselect">
              <ListItem value="inner" checkmark={null}>
                Inner item
              </ListItem>
            </List>
            <button>Outer action</button>
          </span>
        </ListItem>
      </List>,
    );

    const row = getByRole('row');
    row.focus();
    fireEvent.keyDown(row, { key: 'ArrowRight' });

    expect(getByRole('button', { name: 'Outer action' })).toHaveFocus();
    expect(getByRole('option')).not.toHaveFocus();
    expect(getByRole('option')).toHaveAttribute('tabindex', '0');
  });

  it('preserves changed author tab indices and restores them when composite navigation is removed', async () => {
    const renderList = (navigationMode: 'composite' | undefined, tabIndex: number | undefined) => (
      <List as="div" role="grid" navigationMode={navigationMode}>
        <ListItem as="div" role="row" value="one">
          <span role="gridcell">
            <button tabIndex={tabIndex}>Edit</button>
            <button>More</button>
          </span>
        </ListItem>
      </List>
    );
    const { getByRole, rerender } = render(renderList('composite', undefined));
    const row = getByRole('row');
    row.focus();
    fireEvent.keyDown(row, { key: 'ArrowRight' });
    expect(getByRole('button', { name: 'Edit' })).toHaveFocus();

    rerender(renderList('composite', -1));
    await waitFor(() => expect(getByRole('row')).toHaveAttribute('tabindex', '0'));
    row.focus();
    fireEvent.keyDown(row, { key: 'ArrowRight' });
    expect(getByRole('button', { name: 'More' })).toHaveFocus();

    rerender(renderList(undefined, -1));
    expect(getByRole('button', { name: 'Edit' })).toHaveAttribute('tabindex', '-1');
    expect(getByRole('button', { name: 'More' })).not.toHaveAttribute('tabindex');
  });
});
