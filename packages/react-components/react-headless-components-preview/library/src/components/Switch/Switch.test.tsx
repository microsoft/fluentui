import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Switch } from './Switch';

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole, getByText } = render(<Switch defaultChecked label="Default Switch" />);
    const switchInput = getByRole('switch');

    expect(switchInput).toBeInTheDocument();
    expect(switchInput).toBeChecked();
    expect(getByText('Default Switch')).toBeInTheDocument();
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<Switch disabled label="Disabled Switch" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });

  it('renders with data-disabled-focusable when disabledFocusable', () => {
    const { container } = render(<Switch disabledFocusable label="Disabled Focusable Switch" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('data-disabled-focusable');
  });

  it('renders with data-checked when checked', () => {
    const { container } = render(<Switch checked label="Checked Switch" />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-checked');
  });
});
