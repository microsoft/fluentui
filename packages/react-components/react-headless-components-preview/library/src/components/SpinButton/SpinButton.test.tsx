import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SpinButton } from './SpinButton';

describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const { getByRole, getByLabelText } = render(<SpinButton defaultValue={1} min={0} max={10} />);
    const spinbutton = getByRole('spinbutton');

    expect(spinbutton).toBeInTheDocument();
    expect(spinbutton).toHaveAttribute('aria-valuemin', '0');
    expect(spinbutton).toHaveAttribute('aria-valuemax', '10');
    expect(spinbutton).toHaveAttribute('aria-valuenow', '1');
    expect(spinbutton).toHaveValue('1');
    expect(getByLabelText('Increment value')).toBeInTheDocument();
    expect(getByLabelText('Decrement value')).toBeInTheDocument();
  });

  it('renders with data-at-bound when at min value', () => {
    const { container } = render(<SpinButton defaultValue={0} min={0} max={10} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-at-bound', 'min');
  });

  it('renders with data-at-bound when at max value', () => {
    const { container } = render(<SpinButton defaultValue={10} min={0} max={10} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-at-bound', 'max');
  });
});
