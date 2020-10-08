import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { create } from '@uifabric/utilities/lib/test';
import { ReactWrapper, mount } from 'enzyme';

import { SpinButton } from './SpinButton';
import { ISpinButton, ISpinButtonProps } from './SpinButton.types';
import { KeyCodes, resetIds } from '../../Utilities';
import { mockEvent } from '../../common/testUtilities';
import { isConformant } from '../../common/isConformant';

describe('SpinButton', () => {
  let ref: React.RefObject<ISpinButton>;
  let wrapper: ReactWrapper<ISpinButtonProps> | undefined;

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

  it('renders correctly', () => {
    const component = create(<SpinButton label="label" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with user-provided values', () => {
    const component = create(
      <SpinButton label="label" value="0" ariaValueNow={0} ariaValueText="0 pt" data-test="test" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('respects label', () => {
    wrapper = mount(<SpinButton label="my label" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    const labelDOM = wrapper.getDOMNode().querySelector('label')!;

    expect(labelDOM.textContent).toBe('my label');
    expect(labelDOM.htmlFor).toBe(inputDOM.id);
    expect(inputDOM.getAttribute('aria-labelledby')).toBe(labelDOM.id);
  });

  it('uses default min and max', () => {
    wrapper = mount(<SpinButton />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    expect(inputDOM.getAttribute('aria-valuemin')).toBe('0');
    expect(inputDOM.getAttribute('aria-valuemax')).toBe('100');
  });

  it('respects min and max in DOM', () => {
    wrapper = mount(<SpinButton min={2} max={22} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    expect(inputDOM.getAttribute('aria-valuemin')).toBe('2');
    expect(inputDOM.getAttribute('aria-valuemax')).toBe('22');
  });

  it('respects defaultValue', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    expect(ref.current!.value).toBe('12');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('12');
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(null);
  });

  it('respects empty defaultValue', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="" />);

    expect(ref.current!.value).toBe('');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(null);
    expect(inputDOM.getAttribute('aria-valuetext')).toBe('');
  });

  // This is probably a behavior we should get rid of in the future (replace with custom rendering
  // or something), but documenting it for now...
  it('respects non-numeric defaultValue', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12 pt" />);

    expect(ref.current!.value).toBe('12 pt');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('12 pt');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(null);
    expect(inputDOM.getAttribute('aria-valuetext')).toBe('12 pt');
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

    expect(ref.current!.value).toBe('3');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('3');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('3');
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(null);
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

    expect(ref.current!.value).toBe('12 pt');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('12 pt');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(null);
    expect(inputDOM.getAttribute('aria-valuetext')).toBe('12 pt');
  });

  it('respects empty value', () => {
    wrapper = mount(<SpinButton componentRef={ref} value="" />);

    expect(ref.current!.value).toBe('');

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    expect(inputDOM.value).toBe('');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(null);
    expect(inputDOM.getAttribute('aria-valuetext')).toBe('');
  });

  it('uses min as default if neither value nor defaultValue is provided', () => {
    wrapper = mount(<SpinButton componentRef={ref} min={2} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    expect(ref.current!.value).toBe('2');
    expect(inputDOM.value).toBe('2');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('2');
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(null);
  });

  it('uses 0 as default if neither value, defaultValue nor min is provided', () => {
    wrapper = mount(<SpinButton componentRef={ref} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    expect(ref.current!.value).toBe('0');
    expect(inputDOM.value).toBe('0');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('0');
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(null);
  });

  it('increments value when up button is pressed', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    const buttonDOM = wrapper.getDOMNode().getElementsByClassName('ms-UpButton')[0];

    expect(buttonDOM.tagName).toBe('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
    ReactTestUtils.Simulate.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });

    expect(ref.current!.value).toBe('13');
    expect(inputDOM.value).toBe('13');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('13');
    expect(inputDOM.getAttribute('aria-valuetext')).toBe(null);
  });

  it('decrements value when down button is pressed', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    const buttonDOM = wrapper.getDOMNode().getElementsByClassName('ms-DownButton')[0];

    expect(buttonDOM.tagName).toBe('BUTTON');

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });
    ReactTestUtils.Simulate.mouseUp(buttonDOM, { type: 'mouseup', clientX: 0, clientY: 0 });

    expect(ref.current!.value).toBe('11');
    expect(inputDOM.value).toBe('11');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('11');
  });

  it('increments value when up arrow key is pressed', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.up });
    ReactTestUtils.Simulate.keyUp(inputDOM, { which: KeyCodes.up });

    expect(ref.current!.value).toBe('13');
    expect(inputDOM.value).toBe('13');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('13');
  });

  it('decrements value when down arrow key is pressed', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyUp(inputDOM, { which: KeyCodes.down });

    expect(ref.current!.value).toBe('11');
    expect(inputDOM.value).toBe('11');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('11');
  });

  it('respects step when incrementing value', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.up });
    ReactTestUtils.Simulate.keyUp(inputDOM, { which: KeyCodes.up });

    expect(ref.current!.value).toBe('14');
    expect(inputDOM.value).toBe('14');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('14');
  });

  it('respects step when decrementing value', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" step={2} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyUp(inputDOM, { which: KeyCodes.down });

    expect(ref.current!.value).toBe('10');
    expect(inputDOM.value).toBe('10');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('10');
  });

  it('allows value updates when no props are defined', () => {
    wrapper = mount(<SpinButton componentRef={ref} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.Simulate.keyDown(inputDOM, { which: KeyCodes.up });
    expect(inputDOM.value).toBe('1');
    expect(ref.current!.value).toBe('1');
  });

  it('accepts user-entered values when uncontrolled', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);
    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('21'));
      ReactTestUtils.Simulate.blur(inputDOM);
    });

    expect(ref.current!.value).toBe('21');
    expect(inputDOM.value).toBe('21');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('21');
  });

  it('does not accept user-entered values when controlled', () => {
    wrapper = mount(<SpinButton componentRef={ref} value="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('21'));
      ReactTestUtils.Simulate.blur(inputDOM);
    });

    expect(ref.current!.value).toBe('12');
    expect(inputDOM.value).toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('12');
  });

  it('resets value when user entry is invalid', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('garbage'));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('12');
    expect(inputDOM.value).toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('12');
  });

  it('resets value when input is cleared (empty)', () => {
    wrapper = mount(<SpinButton componentRef={ref} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent());
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('12');
    expect(inputDOM.value).toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('12');
  });

  it('resets to max when user-entered value is too high', () => {
    wrapper = mount(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('23'));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('22');
    expect(inputDOM.value).toBe('22');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('22');
  });

  it('resets to min when user-entered value is too low', () => {
    wrapper = mount(<SpinButton componentRef={ref} min={2} max={22} defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('0'));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('2');
    expect(inputDOM.value).toBe('2');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('2');
  });

  it('uses onValidate prop (with valid input)', () => {
    const exampleMinValue = 2;
    const exampleMaxValue = 22;

    wrapper = mount(
      <SpinButton
        componentRef={ref}
        min={exampleMinValue}
        max={exampleMaxValue}
        defaultValue="12"
        onValidate={(newValue: string): string | void => {
          const numberValue: number = +newValue;
          if (!isNaN(numberValue) && numberValue >= exampleMinValue && numberValue <= exampleMaxValue) {
            return newValue;
          }
        }}
      />,
    );

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('21'));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('21');
    expect(inputDOM.value).toBe('21');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('21');
  });

  it('uses onValidate prop', () => {
    const exampleMinValue = 2;
    const exampleMaxValue = 22;

    wrapper = mount(
      <SpinButton
        componentRef={ref}
        min={exampleMinValue}
        max={exampleMaxValue}
        defaultValue="12"
        onValidate={(newValue: string): string | void => {
          const numberValue: number = Number(newValue);
          if (!isNaN(numberValue) && numberValue >= exampleMinValue && numberValue <= exampleMaxValue) {
            return newValue;
          }
        }}
      />,
    );

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('100'));
    ReactTestUtils.Simulate.blur(inputDOM);

    expect(ref.current!.value).toBe('12');
    expect(inputDOM.value).toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('12');
  });

  it('stops spinning if text field is focused while actively spinning', () => {
    jest.useFakeTimers();

    wrapper = mount(<SpinButton defaultValue="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    const buttonDOM: any = wrapper.getDOMNode().querySelector('.ms-UpButton');

    expect(inputDOM.value).toBe('12');
    expect(buttonDOM).toBeTruthy();

    // start spinning
    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });

      // spin again
      jest.runOnlyPendingTimers();

      // spin again
      jest.runOnlyPendingTimers();

      ReactTestUtils.Simulate.focus(inputDOM);
      jest.runAllTimers();
    });

    const currentValue = inputDOM.value;
    expect(currentValue).not.toBe('12');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe(currentValue);
  });

  it('uses custom onIncrement handler', () => {
    const onIncrement: jest.Mock = jest.fn();

    wrapper = mount(<SpinButton onIncrement={onIncrement} />);

    const buttonDOM = wrapper.getDOMNode().getElementsByClassName('ms-UpButton')[0];

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });

    expect(onIncrement).toBeCalled();
  });

  it('uses custom onDecrement handler', () => {
    const onDecrement: jest.Mock = jest.fn();

    wrapper = mount(<SpinButton onDecrement={onDecrement} />);

    const buttonDOM = wrapper.getDOMNode().getElementsByClassName('ms-DownButton')[0];

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });

    expect(onDecrement).toBeCalled();
  });

  it(`passes KeyCode ${KeyCodes.enter} to onValidate handler`, () => {
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

  it('handles controlled scenarios', () => {
    let spinButtonValue = '5';

    wrapper = mount(
      <SpinButton
        value={spinButtonValue}
        onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
          spinButtonValue = newValue;
        }}
      />,
    );

    const buttonDOM = wrapper.getDOMNode().getElementsByClassName('ms-DownButton')[0];

    ReactTestUtils.Simulate.mouseDown(buttonDOM, { type: 'mousedown', clientX: 0, clientY: 0 });

    expect(spinButtonValue).toBe('4');
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

  it('respects custom ariaDescribedBby id to the input', () => {
    const customId = 'customAriaDescriptionId';
    wrapper = mount(<SpinButton label="label" ariaDescribedBy={customId} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;

    const ariaDescribedByAttribute = inputDOM.getAttribute('aria-describedby');
    expect(ariaDescribedByAttribute).toBe(customId);
  });
});
