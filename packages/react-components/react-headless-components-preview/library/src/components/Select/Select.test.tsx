import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Select } from './Select';

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
  });

  it('renders a default state', () => {
    const { getByRole } = render(
      <Select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>,
    );
    const select = getByRole('combobox') as HTMLSelectElement;

    expect(select).toBeInTheDocument();
    expect(select.options).toHaveLength(3);
    expect(select.options[0]).toHaveTextContent('Option 1');
    expect(select.options[1]).toHaveTextContent('Option 2');
    expect(select.options[2]).toHaveTextContent('Option 3');
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(
      <Select disabled>
        <option>Option</option>
      </Select>,
    );
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });
});
