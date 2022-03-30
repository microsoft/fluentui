import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpinButton } from './SpinButton';
import { isConformant } from '../../common/isConformant';
import * as Keys from '@fluentui/keyboard-keys';

const getSpinButtonInput = (): HTMLInputElement => {
  return screen.getByRole('spinbutton') as HTMLInputElement;
};

describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('renders a default unconstrolled state', () => {
    render(<SpinButton defaultValue={10} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.value).toEqual('10');
    expect(spinButton.getAttribute('aria-valuenow')).toEqual('10');
    expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
  });

  it('renders a default controlled state', () => {
    render(<SpinButton value={1} onChange={jest.fn()} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.value).toEqual('1');
    expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
    expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
  });

  it('renders a controlled state with a display value', () => {
    render(<SpinButton value={1} displayValue="$1.00" onChange={jest.fn()} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.value).toEqual('$1.00');
    expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
    expect(spinButton.getAttribute('aria-valuetext')).toEqual('$1.00');
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
  });

  it('applies the correct min value when specified', () => {
    render(<SpinButton value={1} min={0} onChange={jest.fn()} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.getAttribute('aria-valuemin')).toEqual('0');
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
  });

  it('applies the correct max value when specified', () => {
    render(<SpinButton value={1} max={10} onChange={jest.fn()} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.getAttribute('aria-valuemax')).toEqual('10');
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
  });

  it('does not update the value when defaultValue changes', () => {
    const { rerender } = render(<SpinButton defaultValue={10} />);

    expect(getSpinButtonInput().value).toEqual('10');

    rerender(<SpinButton defaultValue={100} />);
    expect(getSpinButtonInput().value).toEqual('10');
  });

  it('does update the value when the value prop is updated', () => {
    const { rerender } = render(<SpinButton value={1} onChange={jest.fn()} />);

    expect(getSpinButtonInput().value).toEqual('1');

    rerender(<SpinButton value={100} onChange={jest.fn()} />);
    expect(getSpinButtonInput().value).toEqual('100');
  });

  it('does update the value when the displayValue is updated', () => {
    const { rerender } = render(<SpinButton value={1} displayValue="$1.00" onChange={jest.fn()} />);

    expect(getSpinButtonInput().value).toEqual('$1.00');

    rerender(<SpinButton value={100} displayValue="$100.00" onChange={jest.fn()} />);
    expect(getSpinButtonInput().value).toEqual('$100.00');
  });

  it('applies the correct precision to displayed the displayed value', () => {
    render(<SpinButton defaultValue={1.23456} precision={2} />);

    expect(getSpinButtonInput().value).toEqual('1.23');
  });

  it('changes values by `step` via spinner buttons', () => {
    const onChange = jest.fn();
    const { getAllByRole, rerender } = render(<SpinButton value={2} step={2} onChange={onChange} />);

    const [incrementButton, decrementButton] = getAllByRole('button');
    userEvent.click(incrementButton);

    expect(onChange.mock.calls[0][1]).toEqual({ value: 4, displayValue: undefined });

    rerender(<SpinButton value={4} step={2} onChange={onChange} />);
    userEvent.click(decrementButton);

    expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
  });

  it('changes value by `step` via hotkeys', () => {
    const onChange = jest.fn();
    const { rerender } = render(<SpinButton value={2} onChange={onChange} />);

    const spinButton = getSpinButtonInput();
    fireEvent.keyDown(spinButton, { key: Keys.ArrowUp });

    expect(onChange.mock.calls[0][1]).toEqual({ value: 3, displayValue: undefined });

    rerender(<SpinButton value={3} onChange={onChange} />);
    fireEvent.keyDown(spinButton, { key: Keys.ArrowDown });

    expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
  });

  it('changes values by the `stepPage` amount', () => {
    const onChange = jest.fn();
    const { rerender } = render(<SpinButton value={2} stepPage={10} onChange={onChange} />);

    const spinButton = getSpinButtonInput();
    fireEvent.keyDown(spinButton, { key: Keys.PageUp });

    expect(onChange.mock.calls[0][1]).toEqual({ value: 12, displayValue: undefined });

    rerender(<SpinButton value={12} step={2} stepPage={10} onChange={onChange} />);
    fireEvent.keyDown(spinButton, { key: Keys.PageDown });

    expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
  });

  it('removes the increment and decrement buttons from the tab order', () => {
    const { getAllByRole } = render(<SpinButton defaultValue={10} />);

    const [incrementButton, decrementButton] = getAllByRole('button');
    expect(incrementButton.getAttribute('tabIndex')).toEqual('-1');
    expect(decrementButton.getAttribute('tabIndex')).toEqual('-1');
  });

  it('updates value via text input on blur for uncontrolled components', () => {
    render(<SpinButton defaultValue={1} />);

    const spinButton = getSpinButtonInput();
    userEvent.type(spinButton, '23');
    spinButton.blur();

    expect(spinButton.value).toEqual('123');
  });

  it('updates value via text input on blur for controlled components', () => {
    const onChange = jest.fn();

    render(<SpinButton value={1} onChange={onChange} />);
    const spinButton = getSpinButtonInput();

    userEvent.type(spinButton, '23');

    expect(onChange).not.toHaveBeenCalled();
    spinButton.blur();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '123' });
  });

  it('reverts to previous value on "escape" key press', () => {
    const onChange = jest.fn();

    render(<SpinButton value={1} onChange={onChange} />);
    const spinButton = getSpinButtonInput();

    userEvent.type(spinButton, '23');

    expect(spinButton.value).toEqual('123');

    fireEvent.keyDown(spinButton, { key: Keys.Escape });

    expect(spinButton.value).toEqual('1');
    expect(onChange).not.toHaveBeenCalled();

    spinButton.blur();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is disabled', () => {});
});
