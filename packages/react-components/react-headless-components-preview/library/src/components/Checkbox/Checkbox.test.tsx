import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole, getByText } = render(<Checkbox defaultChecked label="Default Checkbox" />);
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(getByText('Default Checkbox')).toBeInTheDocument();
  });

  it('renders with data-checked attribute when checked', () => {
    const { container } = render(<Checkbox defaultChecked label="Checked" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-checked');
  });

  it('renders with data-disabled attribute when disabled', () => {
    const { container } = render(<Checkbox disabled label="Disabled" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });
});
