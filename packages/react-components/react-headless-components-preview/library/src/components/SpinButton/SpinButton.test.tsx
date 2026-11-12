import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SpinButton } from './SpinButton';

describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Value' },
  });

  it('renders a default state', () => {
    const { getByRole, getByLabelText } = render(<SpinButton defaultValue={1} min={0} max={10} />);
    const spinbutton = getByRole('spinbutton');

    expect(spinbutton).toBeInTheDocument();
    expect(spinbutton).toHaveAttribute('aria-valuemin', '0');
    expect(spinbutton).toHaveAttribute('aria-valuemax', '10');
    expect(spinbutton).toHaveAttribute('aria-valuenow', '1');
    expect(spinbutton).toHaveValue('1');
    expect(spinbutton).toHaveAttribute('inputmode', 'decimal');
    expect(getByLabelText('Increment value')).toBeInTheDocument();
    expect(getByLabelText('Decrement value')).toBeInTheDocument();
  });

  it('renders with data-readonly when read-only', () => {
    const { container, getByRole } = render(<SpinButton defaultValue={1} readOnly />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-readonly', '');
    expect(getByRole('spinbutton')).toHaveAttribute('readonly');
    expect(getByRole('spinbutton')).toHaveAttribute('aria-readonly', 'true');
  });

  it('does not render data-readonly when editable', () => {
    const { container } = render(<SpinButton defaultValue={1} />);
    const root = container.firstElementChild!;

    expect(root).not.toHaveAttribute('data-readonly');
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

  it.each([
    ['Increment value', '2'],
    ['Decrement value', '0'],
  ])('keeps focus on the input when pressing %s', (label, value) => {
    const onMouseDown = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole, getByLabelText } = render(
      <SpinButton ref={ref} defaultValue={1} incrementButton={{ onMouseDown }} decrementButton={{ onMouseDown }} />,
    );
    const button = getByLabelText(label);
    const input = getByRole('spinbutton');
    expect(fireEvent.mouseDown(button)).toBe(false);
    expect(input).toHaveFocus();
    expect(ref.current).toBe(input);
    expect(input).toHaveValue(value);
    expect(onMouseDown).toHaveBeenCalledTimes(1);
    fireEvent.mouseUp(button);
  });

  it('preserves input slot overrides', () => {
    const { getByRole } = render(<SpinButton readOnly input={{ inputMode: 'numeric', 'aria-readonly': false }} />);
    expect(getByRole('spinbutton')).toHaveAttribute('inputmode', 'numeric');
    expect(getByRole('spinbutton')).toHaveAttribute('aria-readonly', 'false');
  });
});
