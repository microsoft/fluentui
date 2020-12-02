import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { create } from '@fluentui/utilities/lib/test';
import { ReactWrapper, mount } from 'enzyme';

import { SpinButton } from './SpinButton';
import { ISpinButton, ISpinButtonProps } from './SpinButton.types';
import { KeyCodes, resetIds } from '../../Utilities';
import { mockEvent } from '../../common/testUtilities';
import { isConformant } from '../../common/isConformant';

describe('SpinButton', () => {
  let ref: React.RefObject<ISpinButton>;
  let wrapper: ReactWrapper<ISpinButtonProps> | undefined;

  function verifyValue(value: string, valueText?: boolean) {
    const inputDOM = wrapper!.getDOMNode().querySelector('input')!;
    expect(ref.current!.value).toBe(value);
    expect(inputDOM.value).toBe(value);
    // aria-valuenow is used for fully numeric values
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(valueText ? null : value);
    // aria-valuetext is used for values with suffixes or empty
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(valueText ? value : null);
  }

  function simulateArrowButton(button: 'up' | 'down', expectedValue: string) {
    const buttonDOM = wrapper!
      .getDOMNode()
      .getElementsByClassName(button === 'up' ? 'ms-UpButton' : 'ms-DownButton')[0];

    expect(buttonDOM.tagName).toBe('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
    ReactTestUtils.Simulate.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });

    verifyValue(expectedValue);
  }

  function simulateArrowKey(which: KeyCodes, expectedValue: string) {
    const inputDOM = wrapper!.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which });
    ReactTestUtils.Simulate.keyUp(inputDOM, { which });

    verifyValue(expectedValue);
  }

  function simulateInput(enteredValue: string, expectedValue?: string) {
    const inputDOM = wrapper!.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(enteredValue));
    ReactTestUtils.Simulate.blur(inputDOM);

    verifyValue(expectedValue ?? enteredValue);
  }

  beforeEach(() => {
    ref = React.createRef<ISpinButton>();
    resetIds();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  isConformant({
    Component: SpinButton,
    displayName: 'SpinButton',
  });

  describe('snapshots', () => {
    it('renders correctly', () => {
      const component = create(<SpinButton min={0} max={100} label="label" />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with user-provided values', () => {
      const component = create(
        <SpinButton min={0} max={100} label="label" value="0" ariaValueNow={0} ariaValueText="0 pt" data-test="test" />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('basic props', () => {
    it('respects label', () => {
      wrapper = mount(<SpinButton label="my label" />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;
      const labelDOM = wrapper.getDOMNode().querySelector('label')!;

      expect(labelDOM.textContent).toBe('my label');
      expect(labelDOM.htmlFor).toBe(inputDOM.id);
      expect(inputDOM.getAttribute('aria-labelledby')).toBe(labelDOM.id);
    });

    it('leaves min and max unset by default', () => {
      wrapper = mount(<SpinButton />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;

      expect(inputDOM.getAttribute('aria-valuemin')).toBe(null);
      expect(inputDOM.getAttribute('aria-valuemax')).toBe(null);
    });

    it('respects min', () => {
      wrapper = mount(<SpinButton min={-1} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;

      expect(inputDOM.getAttribute('aria-valuemin')).toBe('-1');
      expect(inputDOM.getAttribute('aria-valuemax')).toBe(null);
    });

    it('respects max', () => {
      wrapper = mount(<SpinButton max={22} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;

      expect(inputDOM.getAttribute('aria-valuemin')).toBe(null);
      expect(inputDOM.getAttribute('aria-valuemax')).toBe('22');
    });

    it('respects custom ariaDescribedBy id to the input', () => {
      const customId = 'customAriaDescriptionId';
      wrapper = mount(<SpinButton label="label" ariaDescribedBy={customId} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;

      const ariaDescribedByAttribute = inputDOM.getAttribute('aria-describedby');
      expect(ariaDescribedByAttribute).toBe(customId);
    });
  });

  describe('value props', () => {
    it('respects defaultValue', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      verifyValue('12');
    });

    it('respects empty defaultValue', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="" />);

      verifyValue('', true);
    });

    // This is probably a behavior we should get rid of in the future (replace with custom rendering
    // or something), but documenting it for now...
    it('respects non-numeric defaultValue', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12 pt" />);

      verifyValue('12 pt', true);
    });

    it('ignores updates to defaultValue', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="3" />);

      expect(ref.current!.value).toBe('3');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('3');

      wrapper.setProps({ defaultValue: '4' });
      wrapper.update();

      expect(ref.current!.value).toBe('3');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('3');
    });

    it('respects value', () => {
      wrapper = mount(<SpinButton componentRef={ref} value="3" />);

      verifyValue('3');
    });

    it('respects updates to value', () => {
      wrapper = mount(<SpinButton componentRef={ref} value="3" />);
      expect(ref.current!.value).toBe('3');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('3');

      wrapper.setProps({ value: '4' });
      wrapper.update();

      expect(ref.current!.value).toBe('4');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('4');
    });

    // This is probably a behavior we should get rid of in the future (replace with custom rendering
    // or something), but documenting it for now...
    it('respects non-numeric value', () => {
      wrapper = mount(<SpinButton componentRef={ref} value="12 pt" />);

      verifyValue('12 pt', true);
    });

    it('respects empty value', () => {
      wrapper = mount(<SpinButton componentRef={ref} value="" />);

      verifyValue('', true);
    });

    it('respects value even if invalid', () => {
      // Per standard fully controlled behavior, props.value should NOT be validated
      wrapper = mount(<SpinButton componentRef={ref} value="-1" min={0} max={100} />);

      verifyValue('-1');
    });

    it('uses min as default if neither value nor defaultValue is provided', () => {
      wrapper = mount(<SpinButton componentRef={ref} min={2} />);

      verifyValue('2');
    });

    it('uses 0 as default if neither value, defaultValue nor min is provided', () => {
      wrapper = mount(<SpinButton componentRef={ref} />);

      verifyValue('0');
    });
  });

  describe('increment and decrement', () => {
    it('increments value when up button is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateArrowButton('up', '13');
      // There was a bug where going twice didn't work
      simulateArrowButton('up', '14');
    });

    it('decrements value when down button is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateArrowButton('down', '11');
      simulateArrowButton('down', '10');
    });

    it('does not go above max when up button is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" max={12} />);

      simulateArrowButton('up', '12');
    });

    it('does not go below min when down button is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" min={12} />);

      simulateArrowButton('down', '12');
    });

    it('increments value when up arrow key is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateArrowKey(KeyCodes.up, '13');
      simulateArrowKey(KeyCodes.up, '14');
    });

    it('decrements value when down arrow key is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateArrowKey(KeyCodes.down, '11');
      simulateArrowKey(KeyCodes.down, '10');
    });

    it('does not go above max when up arrow is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" max={12} />);

      simulateArrowKey(KeyCodes.up, '12');
    });

    it('does not go below min when down arrow is pressed', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" min={12} />);

      simulateArrowKey(KeyCodes.down, '12');
    });

    it('respects step when incrementing value', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

      simulateArrowKey(KeyCodes.up, '14');
      simulateArrowKey(KeyCodes.up, '16');
    });

    it('respects step when decrementing value', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

      simulateArrowKey(KeyCodes.down, '10');
      simulateArrowKey(KeyCodes.down, '8');
    });

    it('does not step out of bounds', () => {
      // In this case incrementing or decrementing by the full step takes the value out of bounds.
      // The update should still be respected but clamped within valid range.
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" step={2} min={11} max={12} />);

      simulateArrowKey(KeyCodes.down, '11');
      simulateArrowKey(KeyCodes.up, '12');
    });

    it('can step below 0 if min is unspecified', () => {
      wrapper = mount(<SpinButton componentRef={ref} />);

      simulateArrowKey(KeyCodes.down, '-1');
    });

    it('supports decimal steps', () => {
      wrapper = mount(<SpinButton componentRef={ref} step={0.1} />);

      simulateArrowButton('up', '0.1');
      simulateArrowButton('up', '0.2');
    });
  });

  describe('editing value', () => {
    it('allows value updates when no props are defined', () => {
      wrapper = mount(<SpinButton componentRef={ref} />);

      simulateArrowKey(KeyCodes.up, '1');
    });

    it('accepts user-entered values when uncontrolled', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateInput('21');
    });

    it('does not accept user-entered values when controlled', () => {
      wrapper = mount(<SpinButton componentRef={ref} value="12" />);

      simulateInput('21', '12');
    });

    it('resets value when user entry is invalid', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateInput('garbage', '12');
    });

    it('resets value when input is cleared (empty)', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

      simulateInput('', '12');
    });

    it('resets to max when user-entered value is too high', () => {
      wrapper = mount(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" />);

      simulateInput('23', '22');
    });

    it('resets to min when user-entered value is too low', () => {
      wrapper = mount(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" />);

      simulateInput('0', '2');
    });

    it('resets to latest valid value if garbage is typed after valid updates', () => {
      wrapper = mount(<SpinButton componentRef={ref} defaultValue="2" />);

      simulateArrowButton('up', '3');

      simulateInput('garbage', '3');
    });

    // Not sure if this behavior is correct. Adding a test to document it for now, but we
    // could consider changing it later (to round user input as well as steps).
    it('does not round user input even if precision is 0', () => {
      wrapper = mount(<SpinButton componentRef={ref} step={1} precision={0} />);

      simulateInput('1.7', '1.7');
    });
  });

  describe('custom handlers', () => {
    it('uses onValidate prop (with valid input)', () => {
      const min = 2;
      const max = 22;

      const onValidate = jest.fn((newValue: string): string | void => {
        const numberValue: number = +newValue;
        if (!isNaN(numberValue) && numberValue >= min && numberValue <= max) {
          return newValue;
        }
      });

      wrapper = mount(<SpinButton componentRef={ref} min={min} max={max} defaultValue="12" onValidate={onValidate} />);

      simulateInput('21');
      expect(onValidate).toHaveBeenCalledTimes(1);
    });

    it('uses onValidate prop', () => {
      const min = 2;
      const max = 22;

      const onValidate = jest.fn((newValue: string): string | void => {
        const numberValue: number = +newValue;
        if (!isNaN(numberValue) && numberValue >= min && numberValue <= max) {
          return newValue;
        }
      });

      wrapper = mount(<SpinButton componentRef={ref} min={min} max={max} defaultValue="12" onValidate={onValidate} />);

      simulateInput('100', '12');
      expect(onValidate).toHaveBeenCalledTimes(1);
    });

    it('uses custom onIncrement handler', () => {
      const onIncrement: jest.Mock = jest.fn();

      wrapper = mount(<SpinButton componentRef={ref} defaultValue="2" onIncrement={onIncrement} />);

      simulateArrowButton('up', '2'); // value doesn't change since handler returns nothing
      expect(onIncrement).toHaveBeenCalledTimes(1);
    });

    it('uses custom onDecrement handler', () => {
      const onDecrement: jest.Mock = jest.fn();

      wrapper = mount(<SpinButton componentRef={ref} defaultValue="2" onDecrement={onDecrement} />);

      simulateArrowButton('down', '2'); // value doesn't change since handler returns nothing
      expect(onDecrement).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it(`passes KeyCodes.enter to onValidate handler`, () => {
      let keyCode: number | undefined;
      const onValidate: jest.Mock = jest.fn((value: string, event?: React.SyntheticEvent) => {
        keyCode = (event as React.KeyboardEvent).which;
        return value;
      });

      wrapper = mount(<SpinButton onValidate={onValidate} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;
      ReactTestUtils.Simulate.focus(inputDOM);
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('99'));
      ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.enter });
      expect(onValidate).toBeCalled();
      expect(keyCode).toBe(KeyCodes.enter);
      ReactTestUtils.Simulate.blur(inputDOM);
      expect(onValidate).toHaveBeenCalledTimes(1);
    });

    it('does not call onValidate again on enter key press until the input changes', () => {
      const onValidate = jest.fn((value: string) => value);

      wrapper = mount(<SpinButton onValidate={onValidate} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('99'));
      ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(1);

      ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(1);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('10'));
      ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.enter });
      expect(onValidate).toHaveBeenCalledTimes(2);
    });

    it('continues spinning until mouseUp', () => {
      jest.useFakeTimers();

      const onIncrement = jest.fn(value => String(+value + 1));

      wrapper = mount(<SpinButton componentRef={ref} onIncrement={onIncrement} />);

      const buttonDOM = wrapper.getDOMNode().querySelector('.ms-UpButton') as HTMLButtonElement;

      // start spinning (component will re-render after act() call)
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
      });
      expect(onIncrement).toHaveBeenCalledTimes(1);
      expect(onIncrement).toHaveBeenLastCalledWith('0');

      // spin again (at one point subsequent spins were broken)
      ReactTestUtils.act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(onIncrement).toHaveBeenCalledTimes(2);
      expect(onIncrement).toHaveBeenLastCalledWith('1');

      ReactTestUtils.Simulate.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });
      jest.runAllTimers();

      verifyValue('2');
    });

    it('stops spinning if text field is focused while actively spinning', () => {
      jest.useFakeTimers();

      wrapper = mount(<SpinButton componentRef={ref} />);

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;
      const buttonDOM = wrapper.getDOMNode().querySelector('.ms-UpButton') as HTMLButtonElement;

      // start spinning (component will re-render after act() call)
      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
      });
      // spin again
      ReactTestUtils.act(() => {
        jest.runOnlyPendingTimers();
      });

      ReactTestUtils.Simulate.focus(inputDOM);
      jest.runAllTimers();

      verifyValue('2');
    });
  });
});
