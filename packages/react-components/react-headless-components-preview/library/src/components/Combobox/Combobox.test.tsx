import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Combobox } from './Combobox';
import { Option } from '../Dropdown/Option';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'input',
    requiredProps: {
      'aria-label': 'Options',
      open: true,
      children: (
        <>
          <Option>Option 1</Option>
          <Option>Option 2</Option>
        </>
      ),
    },
  });

  it('renders a default state', () => {
    const { getAllByRole, getByRole } = render(
      <Combobox open placeholder="Select an option">
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Combobox>,
    );
    expect(getByRole('combobox')).toBeInTheDocument();

    const listbox = getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveAttribute('popover', 'auto');
    expect(listbox).not.toHaveAttribute('hidden');

    expect(getAllByRole('option')).toHaveLength(3);
  });

  it('hides the clear icon and ignores clicks when not clearable', () => {
    const { getByRole, getByTestId } = render(
      <Combobox
        defaultSelectedOptions={['Cat']}
        defaultValue="Cat"
        clearIcon={{ 'data-testid': 'clear' } as React.HTMLAttributes<HTMLSpanElement>}
      >
        <Option>Cat</Option>
      </Combobox>,
    );
    expect(getByTestId('clear')).toHaveAttribute('hidden');

    fireEvent.click(getByTestId('clear'));

    expect(getByRole('combobox')).toHaveValue('Cat');
  });

  it('hides the clear icon when clearable but nothing is selected', () => {
    const { getByRole, getByTestId } = render(
      <Combobox clearable clearIcon={{ 'data-testid': 'clear' } as React.HTMLAttributes<HTMLSpanElement>}>
        <Option>Cat</Option>
      </Combobox>,
    );
    expect(getByTestId('clear')).toHaveAttribute('hidden');

    fireEvent.click(getByTestId('clear'));

    expect(getByRole('combobox')).toHaveValue('');
  });

  it('shows the clear icon and clears when clearable with a selection', () => {
    const { getByRole, getByTestId } = render(
      <Combobox
        clearable
        defaultSelectedOptions={['Cat']}
        defaultValue="Cat"
        clearIcon={{ 'data-testid': 'clear' } as React.HTMLAttributes<HTMLSpanElement>}
      >
        <Option>Cat</Option>
      </Combobox>,
    );
    expect(getByTestId('clear')).not.toHaveAttribute('hidden');
    expect(getByRole('combobox')).toHaveValue('Cat');

    fireEvent.click(getByTestId('clear'));

    expect(getByRole('combobox')).toHaveValue('');
    expect(getByTestId('clear')).toHaveAttribute('hidden');
  });

  it('sets data-selected="true" on the selected option', () => {
    const { getAllByRole } = render(
      <Combobox open defaultSelectedOptions={['Dog']} placeholder="Select">
        <Option>Cat</Option>
        <Option>Dog</Option>
        <Option>Fish</Option>
      </Combobox>,
    );
    const options = getAllByRole('option');
    expect(options[0]).not.toHaveAttribute('data-selected');
    expect(options[1]).toHaveAttribute('data-selected');
    expect(options[2]).not.toHaveAttribute('data-selected');
  });

  it('sets data-disabled="true" on disabled options', () => {
    const { getAllByRole } = render(
      <Combobox open placeholder="Select">
        <Option>Cat</Option>
        <Option disabled>Ferret</Option>
        <Option>Fish</Option>
      </Combobox>,
    );
    const options = getAllByRole('option');
    expect(options[0]).not.toHaveAttribute('data-disabled');
    expect(options[1]).toHaveAttribute('data-disabled');
    expect(options[2]).not.toHaveAttribute('data-disabled');
  });
});
