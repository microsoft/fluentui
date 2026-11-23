import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { List } from '../List';
import { ListItem } from './ListItem';

describe('ListItem', () => {
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

  it('does not expose disabled selection when the list is not selectable', () => {
    const { getByRole } = render(
      <List navigationMode="items">
        <ListItem value="one" disabledSelection>
          First item
        </ListItem>
      </List>,
    );

    expect(getByRole('listitem')).not.toHaveAttribute('data-disabled');
    expect(getByRole('listitem')).not.toHaveAttribute('aria-disabled');
  });

  it('reflects the resolved aria-disabled value in data-disabled', () => {
    const { getByRole } = render(
      <List selectionMode="multiselect">
        <ListItem value="one" disabledSelection aria-disabled={false}>
          First item
        </ListItem>
      </List>,
    );

    expect(getByRole('option')).toHaveAttribute('aria-disabled', 'false');
    expect(getByRole('option')).not.toHaveAttribute('data-disabled');
  });

  it('navigates through button-like inputs without treating them as editable controls', () => {
    const { getByRole } = render(
      <List navigationMode="composite">
        <ListItem value="one">
          <span role="gridcell">
            <input type="button" value="Action" />
            <input type="text" aria-label="Name" />
          </span>
        </ListItem>
      </List>,
    );
    const row = getByRole('row');
    const action = getByRole('button', { name: 'Action' });
    const name = getByRole('textbox', { name: 'Name' });

    row.focus();
    fireEvent.keyDown(row, { key: 'ArrowRight' });
    expect(action).toHaveFocus();

    fireEvent.keyDown(action, { key: 'ArrowRight' });
    expect(name).toHaveFocus();
  });

  it('preserves cancellation of composite navigation through the consumer handler', () => {
    const onKeyDown = jest.fn(event => event.preventDefault());
    const { getByRole } = render(
      <List navigationMode="composite">
        <ListItem value="one" onKeyDown={onKeyDown}>
          <span role="gridcell">
            <button>Edit</button>
          </span>
        </ListItem>
      </List>,
    );
    const row = getByRole('row');
    row.focus();
    fireEvent.keyDown(row, { key: 'ArrowRight' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(row).toHaveFocus();
    expect(getByRole('button')).not.toHaveFocus();
  });

  it('preserves base selection and action handling in composite mode', () => {
    const onAction = jest.fn();
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <List navigationMode="composite" selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" onAction={onAction} checkmark={null}>
          <span role="gridcell">
            <button>Edit</button>
          </span>
        </ListItem>
      </List>,
    );
    const row = getByRole('row');
    fireEvent.keyDown(row, { key: ' ' });
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it('preserves the consumer checkmark ref and change handler without toggling twice', () => {
    const ref = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" checkmark={{ ref, onChange }}>
          First item
        </ListItem>
      </List>,
    );

    expect(ref.current).toBe(getByRole('checkbox'));
    fireEvent.click(getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(getByRole('option')).toHaveAttribute('data-selected', '');
  });

  it('lets the checkmark change handler cancel selection', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <List selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <ListItem value="one" checkmark={{ onChange: event => event.preventDefault() }}>
          First item
        </ListItem>
      </List>,
    );

    fireEvent.click(getByRole('checkbox'));

    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(getByRole('option')).not.toHaveAttribute('data-selected');
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
