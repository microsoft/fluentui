import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import { ListItem } from './ListItem/ListItem';

describe('List', () => {
  isConformant({
    Component: List,
    displayName: 'List',
  });

  // The list warns about role/navigation combinations that Tabster cannot verify in jsdom.
  const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn());

  afterAll(() => {
    consoleWarn.mockRestore();
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
          <span role="gridcell">First item</span>
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
});
