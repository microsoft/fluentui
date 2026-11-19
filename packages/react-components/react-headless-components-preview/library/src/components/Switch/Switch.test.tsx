import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Switch } from './Switch';

describe('Switch', () => {
  isConformant({
    Component: Switch,
    displayName: 'Switch',
    primarySlot: 'input',
    requiredProps: { label: 'Switch' },
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

  it('renders data-checked when uncontrolled with defaultChecked', () => {
    const { container } = render(<Switch defaultChecked label="x" />);

    expect(container.firstElementChild!).toHaveAttribute('data-checked');
  });

  it('toggles data-checked when an uncontrolled switch is clicked', () => {
    const { container, getByRole } = render(<Switch label="x" />);
    const root = container.firstElementChild!;
    const input = getByRole('switch');

    expect(root).not.toHaveAttribute('data-checked');
    fireEvent.click(input);
    expect(root).toHaveAttribute('data-checked');
    fireEvent.click(input);
    expect(root).not.toHaveAttribute('data-checked');
  });

  it('keeps data-checked in sync with a controlled checked prop', () => {
    const { container, getByRole, rerender } = render(<Switch checked={false} label="x" />);
    const root = container.firstElementChild!;

    fireEvent.click(getByRole('switch'));
    expect(root).not.toHaveAttribute('data-checked');

    rerender(<Switch checked label="x" />);
    expect(root).toHaveAttribute('data-checked');
  });

  it('follows checked passed through the input slot', () => {
    const { container } = render(<Switch input={{ checked: true, onChange: jest.fn() }} label="x" />);

    expect(container.firstElementChild!).toHaveAttribute('data-checked');
  });

  it('lets the input slot checked override the checked prop', () => {
    const { container, getByRole } = render(
      <Switch checked input={{ checked: false, onChange: jest.fn() }} label="x" />,
    );

    expect(getByRole('switch')).not.toBeChecked();
    expect(container.firstElementChild!).not.toHaveAttribute('data-checked');
  });

  it('calls onChange with the new checked value when uncontrolled', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Switch onChange={onChange} label="x" />);

    fireEvent.click(getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { checked: true });
  });
});
