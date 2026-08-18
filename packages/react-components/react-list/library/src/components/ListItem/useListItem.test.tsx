import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { List } from '../List/List';
import { ListItem } from './ListItem';

/**
 * Behavior that must survive the split between `useListItem_unstable` and the design free
 * `useListItemBase_unstable`: Tabster wiring, the Fluent `Checkbox` checkmark, and the exact
 * ordering between the consumer `onKeyDown` handler and the built in key handling.
 */
describe('ListItem behavior contract', () => {
  const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn());

  afterAll(() => {
    consoleWarn.mockRestore();
  });

  it('applies Tabster attributes to the list and to focusable list items', () => {
    const { getByRole, getAllByRole } = render(
      <List navigationMode="items">
        <ListItem value="one">First</ListItem>
        <ListItem value="two">Second</ListItem>
      </List>,
    );

    expect(getByRole('list').hasAttribute('data-tabster')).toBe(true);
    for (const item of getAllByRole('listitem')) {
      expect(item.hasAttribute('data-tabster')).toBe(true);
    }
  });

  it('does not apply arrow navigation to non focusable list items', () => {
    const { getAllByRole } = render(
      <List>
        <ListItem value="one">First</ListItem>
      </List>,
    );

    expect(getAllByRole('listitem')[0].getAttribute('data-tabster')).not.toContain('mover');
  });

  it('renders the checkmark as a Fluent Checkbox', () => {
    const { getAllByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First</ListItem>
      </List>,
    );

    const checkbox = getAllByRole('checkbox')[0];

    expect(checkbox.tagName).toBe('INPUT');
    expect(checkbox.getAttribute('tabindex')).toBe('-1');
    // The Fluent Checkbox wraps its input in a labelled root, unlike a bare native checkbox.
    expect(checkbox.closest('.fui-Checkbox')).not.toBeNull();
  });

  it('lets the consumer onKeyDown handler opt out of the built in Space handling', () => {
    const onSelectionChange = jest.fn();

    const { getByText } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" onKeyDown={e => e.preventDefault()}>
          First
        </ListItem>
      </List>,
    );

    fireEvent.keyDown(getByText('First'), { key: ' ' });

    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('forwards the checkmark ref so clicking the checkbox does not trigger the item action', () => {
    const onAction = jest.fn();

    const { getAllByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one" onAction={onAction}>
          First
        </ListItem>
      </List>,
    );

    fireEvent.click(getAllByRole('checkbox')[0]);

    expect(onAction).not.toHaveBeenCalled();
  });

  it('keeps the item non actionable for selection when disabledSelection is set', () => {
    const onSelectionChange = jest.fn();

    const { getByText } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" disabledSelection>
          First
        </ListItem>
      </List>,
    );

    const item = getByText('First');
    expect(item.getAttribute('aria-disabled')).toBe('true');

    fireEvent.keyDown(item, { key: ' ' });
    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
