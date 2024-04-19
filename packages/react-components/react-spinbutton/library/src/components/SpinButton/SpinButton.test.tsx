import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { SpinButton } from './SpinButton';
import { isConformant } from '../../testing/isConformant';
import { ArrowUp, ArrowDown, End, Escape, Home, PageDown, PageUp } from '@fluentui/keyboard-keys';

const getSpinButtonInput = (): HTMLInputElement => {
  return screen.getByRole('spinbutton') as HTMLInputElement;
};

describe('SpinButton', () => {
  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
    primarySlot: 'input',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default uncontrolled state', () => {
    const { getAllByRole } = render(<SpinButton defaultValue={10} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.value).toEqual('10');
    expect(spinButton.getAttribute('aria-valuenow')).toEqual('10');
    expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();

    const [incrementButton, decrementButton] = getAllByRole('button');
    expect(incrementButton.getAttribute('aria-label')).toEqual('Increment value');
    expect(decrementButton.getAttribute('aria-label')).toEqual('Decrement value');
  });

  it('renders a default controlled state', () => {
    const { getAllByRole } = render(<SpinButton value={1} onChange={jest.fn()} />);

    const spinButton = getSpinButtonInput();
    expect(spinButton.value).toEqual('1');
    expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
    expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    expect(spinButton.getAttribute('aria-valuemax')).toBeNull();

    const [incrementButton, decrementButton] = getAllByRole('button');
    expect(incrementButton.getAttribute('aria-label')).toEqual('Increment value');
    expect(decrementButton.getAttribute('aria-label')).toEqual('Decrement value');
  });

  it('can be disabled', () => {
    const { getAllByRole } = render(<SpinButton disabled={true} defaultValue={1} />);

    expect(getSpinButtonInput().disabled).toEqual(true);
    const [incrementButton, decrementButton] = getAllByRole('button') as HTMLButtonElement[];
    expect(incrementButton.disabled).toEqual(true);
    expect(decrementButton.disabled).toEqual(true);
  });

  describe('displayValue', () => {
    it('does not render `displayValue` when uncontrolled', () => {
      render(<SpinButton defaultValue={1} displayValue="$1.00" onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.value).toEqual('1');
      expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
      expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
      expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
      expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
    });

    it('renders `displayValue` when controlled', () => {
      render(<SpinButton value={1} displayValue="$1.00" onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.value).toEqual('$1.00');
      expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
      expect(spinButton.getAttribute('aria-valuetext')).toEqual('$1.00');
      expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
      expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
    });

    it('respects `aria-valuetext` when alongside `displayValue`', () => {
      render(<SpinButton value={1} displayValue="$1.00" aria-valuetext="Custom value text" onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.value).toEqual('$1.00');
      expect(spinButton.getAttribute('aria-valuenow')).toEqual('1');
      expect(spinButton.getAttribute('aria-valuetext')).toEqual('Custom value text');
      expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
      expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
    });
  });

  describe('null values', () => {
    it('renders a null value when uncontrolled', () => {
      render(<SpinButton defaultValue={null} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.value).toBe('');
      expect(spinButton.getAttribute('aria-valuenow')).toBeNull();
      expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    });

    it('renders a null value when controlled', () => {
      render(<SpinButton value={null} onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.value).toBe('');
      expect(spinButton.getAttribute('aria-valuenow')).toBeNull();
      expect(spinButton.getAttribute('aria-valuetext')).toBeNull();
    });
  });

  describe('bounds', () => {
    it('applies the correct min and max value when both are specified', () => {
      render(<SpinButton value={1} min={0} max={10} onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.getAttribute('aria-valuemin')).toEqual('0');
      expect(spinButton.getAttribute('aria-valuemax')).toEqual('10');
    });

    it('applies the correct min value when specified', () => {
      render(<SpinButton value={1} min={0} onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.getAttribute('aria-valuemin')).toEqual('0');
      expect(spinButton.getAttribute('aria-valuemax')).toBeNull();
    });

    it('clamps value at min when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={-100} min={-100} onChange={onChange} />);

      const [, decrementButton] = getAllByRole('button');
      userEvent.click(decrementButton);

      expect(onChange).not.toHaveBeenCalled();
      expect(getSpinButtonInput().value).toEqual('-100');
    });

    it('clamps value at min when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton value={-100} min={-100} onChange={onChange} />);

      const [, decrementButton] = getAllByRole('button');
      userEvent.click(decrementButton);

      expect(onChange).not.toHaveBeenCalled();
      expect(getSpinButtonInput().value).toEqual('-100');
    });

    it('applies the correct max value when specified', () => {
      render(<SpinButton value={1} max={10} onChange={jest.fn()} />);

      const spinButton = getSpinButtonInput();
      expect(spinButton.getAttribute('aria-valuemax')).toEqual('10');
      expect(spinButton.getAttribute('aria-valuemin')).toBeNull();
    });

    it('clamps value at max when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={100} max={100} onChange={onChange} />);

      const [incrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).not.toHaveBeenCalled();
      expect(getSpinButtonInput().value).toEqual('100');
    });

    it('clamps value at max when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton value={100} max={100} onChange={onChange} />);

      const [incrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).not.toHaveBeenCalled();
      expect(getSpinButtonInput().value).toEqual('100');
    });

    it('clamps the value when outside the bounds when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={100} min={0} max={10} onChange={onChange} />);

      expect(getSpinButtonInput().value).toEqual('100');
      const [incrementButton] = getAllByRole('button');

      userEvent.click(incrementButton);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 10, displayValue: undefined });
      expect(getSpinButtonInput().value).toEqual('10');
    });

    it('clamps the value when outside the bounds when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole, rerender } = render(<SpinButton value={100} min={0} max={10} onChange={onChange} />);

      expect(getSpinButtonInput().value).toEqual('100');
      const [incrementButton, decrementButton] = getAllByRole('button');

      userEvent.click(incrementButton);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 10, displayValue: undefined });

      rerender(<SpinButton value={-1} min={0} max={10} onChange={onChange} />);

      userEvent.click(decrementButton);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 0, displayValue: undefined });
    });

    it('sets the value to min when "Home" is pressed when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={5} min={0} max={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: Home });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 0, displayValue: undefined });
      expect(spinButton.value).toEqual('0');
    });

    it('sets the value to min when "Home" is pressed when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={5} min={0} max={10} onChange={onChange} />);

      fireEvent.keyDown(getSpinButtonInput(), { key: Home });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 0, displayValue: undefined });
    });

    it('does not change the value when "Home" is pressed if no min value is set when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={5} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: Home });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(spinButton.value).toEqual('5');
    });

    it('does not change the value when "Home" is pressed if no min value is set when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={5} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: Home });
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('sets the value to max when "End" is pressed when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={5} min={0} max={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: End });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 10, displayValue: undefined });
      expect(spinButton.value).toEqual('10');
    });

    it('sets the value to max when "End" is pressed when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={5} min={0} max={10} onChange={onChange} />);

      fireEvent.keyDown(getSpinButtonInput(), { key: End });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 10, displayValue: undefined });
    });

    it('does not change the value when "End" is pressed if no max value is set when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={5} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: End });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(spinButton.value).toEqual('5');
    });

    it('does not change the value when "End" is pressed if no max value is set when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={5} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: End });
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('value updates', () => {
    it('does not update the value when `defaultValue` changes', () => {
      const { rerender } = render(<SpinButton defaultValue={10} />);

      expect(getSpinButtonInput().value).toEqual('10');

      rerender(<SpinButton defaultValue={100} />);
      expect(getSpinButtonInput().value).toEqual('10');
    });

    it('does update the value when `value` prop changes', () => {
      const { rerender } = render(<SpinButton value={1} onChange={jest.fn()} />);

      expect(getSpinButtonInput().value).toEqual('1');

      rerender(<SpinButton value={100} onChange={jest.fn()} />);
      expect(getSpinButtonInput().value).toEqual('100');
    });

    it('does update the value when `displayValue` is updated when controlled', () => {
      const { rerender } = render(<SpinButton value={1} displayValue="$1.00" onChange={jest.fn()} />);

      expect(getSpinButtonInput().value).toEqual('$1.00');

      rerender(<SpinButton value={100} displayValue="$100.00" onChange={jest.fn()} />);
      expect(getSpinButtonInput().value).toEqual('$100.00');
    });
  });

  describe('precision', () => {
    it('applies the correct precision to the displayed value when uncontrolled', () => {
      const { rerender } = render(<SpinButton defaultValue={1.23456} precision={2} />);

      expect(getSpinButtonInput().value).toEqual('1.23');

      rerender(<SpinButton defaultValue={1.23456} />);
      expect(getSpinButtonInput().value).toEqual('1');

      rerender(<SpinButton defaultValue={1.23456} step={0.5} />);
      expect(getSpinButtonInput().value).toEqual('1.2');
    });

    it('applies the correct precision to the displayed value when controlled', () => {
      const { rerender } = render(<SpinButton value={1.23456} precision={2} />);

      expect(getSpinButtonInput().value).toEqual('1.23');

      rerender(<SpinButton value={1.23456} />);
      expect(getSpinButtonInput().value).toEqual('1');

      rerender(<SpinButton value={1.23456} step={0.5} />);
      expect(getSpinButtonInput().value).toEqual('1.2');
    });
  });

  describe('step', () => {
    it('changes values by `step` via spinner buttons when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={2} step={2} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange.mock.calls[0][1]).toEqual({ value: 4, displayValue: undefined });
      expect(getSpinButtonInput().value).toEqual('4');

      userEvent.click(decrementButton);

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
      expect(getSpinButtonInput().value).toEqual('2');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('changes values by `step` via spinner buttons when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole, rerender } = render(<SpinButton value={2} step={2} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange.mock.calls[0][1]).toEqual({ value: 4, displayValue: undefined });

      rerender(<SpinButton value={4} step={2} onChange={onChange} />);
      userEvent.click(decrementButton);

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('changes value by `step` via hotkeys when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={2} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: ArrowUp });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 3, displayValue: undefined });
      expect(spinButton.value).toEqual('3');

      fireEvent.keyDown(spinButton, { key: ArrowDown });

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
      expect(spinButton.value).toEqual('2');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('changes value by `step` via hotkeys when controlled', () => {
      const onChange = jest.fn();
      const { rerender } = render(<SpinButton value={2} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: ArrowUp });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 3, displayValue: undefined });

      rerender(<SpinButton value={3} onChange={onChange} />);
      fireEvent.keyDown(spinButton, { key: ArrowDown });

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('changes values by the `stepPage` via hotkeys when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={2} stepPage={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: PageUp });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 12, displayValue: undefined });
      expect(spinButton.value).toEqual('12');

      fireEvent.keyDown(spinButton, { key: PageDown });

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
      expect(spinButton.value).toEqual('2');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('changes values by the `stepPage` via hotkeys when controlled', () => {
      const onChange = jest.fn();
      const { rerender } = render(<SpinButton value={2} stepPage={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      fireEvent.keyDown(spinButton, { key: PageUp });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 12, displayValue: undefined });

      rerender(<SpinButton value={12} step={2} stepPage={10} onChange={onChange} />);
      fireEvent.keyDown(spinButton, { key: PageDown });

      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });

      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('onChange', () => {
    it('does not call on change at bounds when uncontrolled', () => {
      const onChange = jest.fn();

      const { getAllByRole } = render(<SpinButton defaultValue={0} min={0} max={1} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      const spinButton = getSpinButtonInput();

      userEvent.click(decrementButton);
      // Already at min bound, no change
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: ArrowDown });
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: PageDown });
      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(incrementButton);
      // From 0 --> 1
      expect(onChange).toHaveBeenCalledTimes(1);

      userEvent.click(incrementButton);
      // At max bound, no change
      expect(onChange).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(spinButton, { key: ArrowUp });
      expect(onChange).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(spinButton, { key: PageUp });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not call change at bounds when controlled', () => {
      const onChange = jest.fn();

      const { getAllByRole, rerender } = render(<SpinButton value={0} min={0} max={1} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      const spinButton = getSpinButtonInput();

      userEvent.click(decrementButton);
      // Already at min bound, no change
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: ArrowDown });
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: PageDown });
      expect(onChange).not.toHaveBeenCalled();

      rerender(<SpinButton value={1} min={0} max={1} onChange={onChange} />);

      userEvent.click(incrementButton);
      // Already at maz bound, no change
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: ArrowUp });
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.keyDown(spinButton, { key: PageUp });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls on change when defaultValue is `null` without min when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={null} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(getSpinButtonInput().value).toBe('1');

      userEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(getSpinButtonInput().value).toBe('0');
    });

    it('calls on change when value is `null` without min when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton value={null} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 1, displayValue: undefined });

      userEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({ value: -1, displayValue: undefined });
    });

    it('calls on change when defaultValue is `null` with min when uncontrolled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton defaultValue={null} min={5} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(getSpinButtonInput().value).toBe('6');

      userEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(getSpinButtonInput().value).toBe('5');
    });

    it('calls on change when value is `null` with min when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole, rerender } = render(<SpinButton value={null} min={5} onChange={onChange} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 6, displayValue: undefined });

      rerender(<SpinButton value={null} min={5} onChange={onChange} />);
      userEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 5, displayValue: undefined });
    });
  });

  describe('text input', () => {
    it('updates value via text input on blur when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '23');
      expect(spinButton.value).toEqual('123');
      spinButton.blur();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(spinButton.value).toEqual('123');
    });

    it('updates value via text input on blur when controlled', () => {
      const onChange = jest.fn();

      render(<SpinButton value={1} onChange={onChange} />);
      const spinButton = getSpinButtonInput();

      userEvent.type(spinButton, '23');

      expect(onChange).not.toHaveBeenCalled();
      expect(spinButton.value).toEqual('123');
      spinButton.blur();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '123' });
    });

    it('updates value after text input when uncontrolled', () => {
      const onChange = jest.fn();

      const { getAllByRole } = render(<SpinButton defaultValue={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '{backspace}cats');
      expect(spinButton.value).toEqual('cats');
      spinButton.blur();
      expect(onChange).toHaveBeenCalledTimes(1);

      const [incrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);
      expect(spinButton.value).toEqual('2');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('updates value after text input when controlled', () => {
      const onChange = jest.fn();
      const { getAllByRole } = render(<SpinButton value={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '{backspace}cats');
      expect(spinButton.value).toEqual('cats');
      spinButton.blur();
      expect(onChange).toHaveBeenCalledTimes(1);

      const [incrementButton] = getAllByRole('button');
      userEvent.click(incrementButton);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 2, displayValue: undefined });
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('updates value via text input on Enter press when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '23');
      expect(spinButton.value).toEqual('123');
      userEvent.type(spinButton, '{enter}');

      expect(spinButton.value).toEqual('123');

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('updates value via text input on Enter press when controlled', () => {
      const onChange = jest.fn();

      render(<SpinButton value={1} onChange={onChange} />);
      const spinButton = getSpinButtonInput();

      userEvent.type(spinButton, '23');

      expect(onChange).not.toHaveBeenCalled();
      expect(spinButton.value).toEqual('123');
      userEvent.type(spinButton, '{enter}');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '123' });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('allows values outside bounds via text input when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={1} min={0} max={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '9999');
      spinButton.blur();

      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '19999' });
      expect(spinButton.value).toEqual('19999');

      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '{backspace}-9999');
      spinButton.blur();

      expect(onChange.mock.calls[1][1]).toEqual({ value: undefined, displayValue: '-9999' });
      expect(spinButton.value).toEqual('-9999');
    });

    it('allows values outside bounds via text input when controlled', () => {
      const onChange = jest.fn();
      const { rerender } = render(<SpinButton value={1} min={0} max={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '9999');
      spinButton.blur();

      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '19999' });

      rerender(<SpinButton value={19999} min={0} max={10} onChange={onChange} />);

      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '{backspace}-9999');
      spinButton.blur();

      expect(onChange.mock.calls[1][1]).toEqual({ value: undefined, displayValue: '-9999' });
    });

    it('reverts to previous value on "escape" key press', () => {
      const onChange = jest.fn();

      render(<SpinButton value={1} onChange={onChange} />);
      const spinButton = getSpinButtonInput();

      userEvent.type(spinButton, '23');

      expect(spinButton.value).toEqual('123');

      fireEvent.keyDown(spinButton, { key: Escape });

      expect(spinButton.value).toEqual('1');
      expect(onChange).not.toHaveBeenCalled();

      spinButton.blur();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('updates value when typing a single digit when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '2{enter}');
      expect(spinButton.value).toEqual('2');

      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '2' });
    });

    it('updates value when typing a single digit when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={10} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      spinButton.setSelectionRange(0, spinButton.value.length);
      userEvent.type(spinButton, '2{enter}');

      expect(onChange.mock.calls[0][1]).toEqual({ value: undefined, displayValue: '2' });
    });
  });

  describe('text input with step', () => {
    it('changes values by `step` and `stepPage` via hotkeys after text input when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={1} stepPage={2} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '23');
      expect(spinButton.value).toEqual('123');

      fireEvent.keyDown(spinButton, { key: ArrowUp });
      expect(spinButton.value).toEqual('124');

      expect(onChange.mock.calls[0][1]).toEqual({ value: 124, displayValue: undefined });

      fireEvent.keyDown(spinButton, { key: PageUp });
      expect(spinButton.value).toEqual('126');

      expect(onChange.mock.calls[1][1]).toEqual({ value: 126, displayValue: undefined });
    });

    it('changes values by `step` and `stepPage` via hotkeys after text input when controlled', () => {
      const onChange = jest.fn();
      const { rerender } = render(<SpinButton value={1} stepPage={2} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '23');
      expect(spinButton.value).toEqual('123');

      fireEvent.keyDown(spinButton, { key: ArrowDown });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 122, displayValue: undefined });

      rerender(<SpinButton value={122} stepPage={2} onChange={onChange} />);

      fireEvent.keyDown(spinButton, { key: PageDown });

      expect(onChange.mock.calls[1][1]).toEqual({ value: 120, displayValue: undefined });
    });

    it('falls back to the last value when changing the value via hotkeys after text input when uncontrolled', () => {
      const onChange = jest.fn();
      render(<SpinButton defaultValue={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '{backspace}kittens');
      expect(spinButton.value).toEqual('kittens');

      fireEvent.keyDown(spinButton, { key: ArrowUp });
      expect(spinButton.value).toEqual('2');

      expect(onChange.mock.calls[0][1]).toEqual({ value: 2, displayValue: undefined });
    });

    it('falls back to the last value when changing the value via hotkeys after text input when controlled', () => {
      const onChange = jest.fn();
      render(<SpinButton value={1} onChange={onChange} />);

      const spinButton = getSpinButtonInput();
      userEvent.type(spinButton, '{backspace}kittens');
      expect(spinButton.value).toEqual('kittens');

      fireEvent.keyDown(spinButton, { key: ArrowUp });

      expect(onChange.mock.calls[0][1]).toEqual({ value: 2, displayValue: undefined });
    });
  });

  describe('tab interaction', () => {
    it('removes the increment and decrement buttons from the tab order', () => {
      const { getAllByRole } = render(<SpinButton defaultValue={10} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      expect(incrementButton.getAttribute('tabIndex')).toEqual('-1');
      expect(decrementButton.getAttribute('tabIndex')).toEqual('-1');
    });
  });

  describe('labeling', () => {
    it('has labels for buttons', () => {
      const { getAllByRole } = render(<SpinButton defaultValue={0} />);

      const [incrementButton, decrementButton] = getAllByRole('button');
      expect(incrementButton.getAttribute('aria-label')).toEqual('Increment value');
      expect(decrementButton.getAttribute('aria-label')).toEqual('Decrement value');
    });

    it('overrides labels for buttons', () => {
      const { getAllByRole } = render(
        <SpinButton
          defaultValue={0}
          incrementButton={{ 'aria-label': 'Increment Override' }}
          decrementButton={{ 'aria-label': 'Decrement Override' }}
        />,
      );

      const [incrementButton, decrementButton] = getAllByRole('button');
      expect(incrementButton.getAttribute('aria-label')).toEqual('Increment Override');
      expect(decrementButton.getAttribute('aria-label')).toEqual('Decrement Override');
    });
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <SpinButton />
      </Field>,
    );

    const spinbutton = result.getByRole('spinbutton') as HTMLInputElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(spinbutton.id).toEqual(label.htmlFor);
    expect(spinbutton.getAttribute('aria-describedby')).toEqual(message.id);
    expect(spinbutton.getAttribute('aria-invalid')).toEqual('true');
    expect(spinbutton.required).toBe(true);
  });
});
