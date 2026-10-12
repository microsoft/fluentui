import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Combobox } from './Combobox';
import { Option } from '../Dropdown/Option';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'input',
    requiredProps: {
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
