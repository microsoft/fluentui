import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { List } from '../List';
import { ListItem } from './ListItem';

describe('ListItem', () => {
  const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn());

  afterAll(() => {
    consoleWarn.mockRestore();
  });

  it('forwards ref, className and style to the root element', () => {
    const ref = React.createRef<HTMLLIElement>();

    const { getByRole } = render(
      <List>
        <ListItem ref={ref} className="custom" style={{ marginBlockStart: '4px' }} value="one">
          First item
        </ListItem>
      </List>,
    );

    const item = getByRole('listitem');

    expect(ref.current).toBe(item);
    expect(item).toHaveClass('custom');
    expect(item).toHaveStyle({ marginBlockStart: '4px' });
  });

  it('is not focusable or selectable by default', () => {
    const { getByRole } = render(
      <List>
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    const item = getByRole('listitem');

    expect(item).not.toHaveAttribute('tabindex');
    expect(item).not.toHaveAttribute('data-navigable');
    expect(item).not.toHaveAttribute('data-selectable');
    expect(item).not.toHaveAttribute('data-disabled');
  });

  it('sets data-navigable and data-selectable when the parent list is selectable', () => {
    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    const item = getByRole('option');

    expect(item).toHaveAttribute('tabindex', '0');
    expect(item).toHaveAttribute('data-navigable', '');
    expect(item).toHaveAttribute('data-selectable', '');
  });

  it('toggles selection with the Space key and reports the inverse action', () => {
    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    const item = getByRole('option');

    fireEvent.keyDown(item, { key: ' ' });
    expect(item).toHaveAttribute('data-selected', '');

    fireEvent.keyDown(item, { key: ' ' });
    expect(item).not.toHaveAttribute('data-selected');
  });

  it('toggles selection through the checkmark slot', () => {
    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one">First item</ListItem>
      </List>,
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(getByRole('option')).toHaveAttribute('data-selected', '');
    expect(checkbox.checked).toBe(true);
  });

  it('calls onAction with the item value on Enter', () => {
    const onAction = jest.fn();

    const { getByRole } = render(
      <List navigationMode="items">
        <ListItem value="one" onAction={onAction}>
          First item
        </ListItem>
      </List>,
    );

    fireEvent.keyDown(getByRole('listitem'), { key: 'Enter' });

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: 'one' }));
  });

  it('sets data-disabled and blocks selection when disabledSelection is set', () => {
    const onSelectionChange = jest.fn();

    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" disabledSelection>
          First item
        </ListItem>
      </List>,
    );

    const item = getByRole('option');

    expect(item).toHaveAttribute('data-disabled', '');
    expect(item).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(item);
    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(item).not.toHaveAttribute('data-selected');
  });

  it('is not disabled when an action is available alongside disabledSelection', () => {
    const onAction = jest.fn();

    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one" disabledSelection onAction={onAction}>
          First item
        </ListItem>
      </List>,
    );

    const item = getByRole('option');

    expect(item).not.toHaveAttribute('data-disabled');
    expect(item).not.toHaveAttribute('aria-disabled');

    fireEvent.click(item);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not let a consumer misrepresent the reserved selected attribute', () => {
    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one" data-selected="yes">
          First item
        </ListItem>
      </List>,
    );

    expect(getByRole('option')).not.toHaveAttribute('data-selected');
  });
});
