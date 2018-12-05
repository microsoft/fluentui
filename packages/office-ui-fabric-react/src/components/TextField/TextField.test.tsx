import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { resetIds, setWarningCallback, IRefObject } from '../../Utilities';

import { TextField } from './TextField';
import { TextFieldBase, ITextFieldState } from './TextField.base';
import { ITextFieldProps, ITextFieldStyles, ITextField } from './TextField.types';

// tslint:disable:jsx-no-lambda

describe('TextField', () => {
  /**
   * The currently rendered ITextField.
   * ONLY set if `componentRef={textFieldRef}` is included in the TextField's props.
   */
  let textField: ITextField;
  /** Use this as the componentRef when rendering a TextField. */
  const textFieldRef: IRefObject<ITextField> = (ref: ITextField | null) => {
    textField = ref!;
  };
  /** Wrapper of the TextField currently being tested */
  let wrapper: ReactWrapper<ITextFieldProps, ITextFieldState, TextFieldBase>;
  const noOp = () => undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  /**
   * Mounts the element attached to a child of document.body. This is primarily for tests involving
   * event handlers (which don't work right unless the element is attached).
   */
  function mountAttached<C extends React.Component, P = C['props'], S = C['state']>(element: React.ReactElement<any>) {
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    return mount<C, P, S>(element, { attachTo: parent });
  }

  function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
    const target: EventTarget = { value: targetValue } as HTMLInputElement;
    const event: ReactTestUtils.SyntheticEventData = { target };

    return event;
  }

  function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millisecond));
  }

  describe('snapshots', () => {
    it('renders correctly', () => {
      const className = 'testClassName';
      const inputClassName = 'testInputClassName';
      const component = renderer.create(<TextField label="Label" className={className} inputClassName={inputClassName} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders multiline unresizable correctly', () => {
      const component = renderer.create(<TextField label="Label" multiline={true} resizable={false} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders multiline resizable correctly', () => {
      const component = renderer.create(<TextField label="Label" multiline={true} resizable={true} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders multiline correctly with props affecting styling', () => {
      const component = renderer.create(
        <TextField label="Label" errorMessage={'test message'} underlined={true} prefix={'test prefix'} suffix={'test suffix'} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders multiline correctly with errorMessage', () => {
      const component = renderer.create(
        <TextField label="Label" errorMessage={'test message'} underlined={true} prefix={'test prefix'} suffix={'test suffix'} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should resepect user component and subcomponent styling', () => {
      const styles: Partial<ITextFieldStyles> = {
        root: 'root-testClassName',
        subComponentStyles: {
          label: {
            root: 'label-testClassName'
          }
        }
      };
      const component = renderer.create(
        <TextField
          label="Label"
          errorMessage={'test message'}
          underlined={true}
          prefix={'test prefix'}
          suffix={'test suffix'}
          styles={styles}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  }); // end snapshots

  describe('rendering values from props', () => {
    it('can render a value', () => {
      const testText = 'initial value';
      // use the noOp change handler because onChange is required when value is specified
      wrapper = mount(<TextField value={testText} onChange={noOp} componentRef={textFieldRef} />);
      const input = wrapper.getDOMNode().querySelector('input');

      expect(input).toBeTruthy();
      expect(input!.value).toEqual(testText);
      expect(textField.value).toEqual(testText);
    });

    it('can render a value as a textarea', () => {
      const testText = 'This\nIs\nMultiline\nText\n';
      wrapper = mount(<TextField value={testText} onChange={noOp} multiline componentRef={textFieldRef} />);
      const textarea = wrapper.getDOMNode().querySelector('textarea');

      expect(textarea).toBeTruthy();
      expect(textarea!.value).toEqual(testText);
      expect(textField.value).toEqual(testText);
    });

    it('should render a value of 0 when given the number 0', () => {
      wrapper = mount(<TextField value={0 as any} onChange={noOp} componentRef={textFieldRef} />);

      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual('0');
      expect(textField.value).toEqual('0');
    });

    it('can render a default value', () => {
      const testText = 'initial value';
      wrapper = mount(<TextField defaultValue={testText} componentRef={textFieldRef} />);
      const input = wrapper.getDOMNode().querySelector('input');

      expect(input).toBeTruthy();
      expect(input!.value).toEqual(testText);
      expect(textField.value).toEqual(testText);
    });

    it('can render a default value as a textarea', () => {
      const testText = 'This\nIs\nMultiline\nText\n';
      wrapper = mount(<TextField defaultValue={testText} multiline componentRef={textFieldRef} />);
      const textarea = wrapper.getDOMNode().querySelector('textarea');

      expect(textarea).toBeTruthy();
      expect(textarea!.value).toEqual(testText);
      expect(textField.value).toEqual(testText);
    });

    it('should render a default value of 0 when given the number 0', () => {
      wrapper = mount(<TextField defaultValue={0 as any} componentRef={textFieldRef} />);

      expect(wrapper.getDOMNode().querySelector('input')!.defaultValue).toEqual('0');
      expect(textField.value).toEqual('0');
    });
  }); // end rendering values from props

  describe('basic props', () => {
    it('can render label', () => {
      const exampleLabel = 'this is label';

      wrapper = mount(<TextField label={exampleLabel} />);

      expect(wrapper.getDOMNode().querySelector('label')!.textContent).toEqual(exampleLabel);
    });

    it('should associate the label and input box', () => {
      wrapper = mount(<TextField label="text-field-label" />);

      const inputDOM = wrapper.getDOMNode().querySelector('input');
      const labelDOM = wrapper.getDOMNode().querySelector('label');

      // Assert the input ID and label FOR attribute are the same.
      expect(inputDOM!.id).toBeDefined();
      expect(inputDOM!.id).toEqual(labelDOM!.htmlFor);
    });

    it('should render prefix', () => {
      const examplePrefix = 'this is a prefix';

      wrapper = mount(<TextField prefix={examplePrefix} />);

      const prefixDOM: Element = wrapper.getDOMNode().getElementsByClassName('ms-TextField-prefix')[0];
      expect(prefixDOM.textContent).toEqual(examplePrefix);
    });

    it('should render suffix', () => {
      const exampleSuffix = 'this is a suffix';

      wrapper = mount(<TextField suffix={exampleSuffix} />);

      const suffixDOM: Element = wrapper.getDOMNode().getElementsByClassName('ms-TextField-suffix')[0];
      expect(suffixDOM.textContent).toEqual(exampleSuffix);
    });

    it('should render both prefix and suffix', () => {
      const examplePrefix = 'this is a prefix';
      const exampleSuffix = 'this is a suffix';

      wrapper = mount(<TextField prefix={examplePrefix} suffix={exampleSuffix} />);

      // Assert on the prefix and suffix
      const prefixDOM: Element = wrapper.getDOMNode().getElementsByClassName('ms-TextField-prefix')[0];
      const suffixDOM: Element = wrapper.getDOMNode().getElementsByClassName('ms-TextField-suffix')[0];
      expect(prefixDOM.textContent).toEqual(examplePrefix);
      expect(suffixDOM.textContent).toEqual(exampleSuffix);
    });

    it('should render a disabled input element', () => {
      wrapper = mount(<TextField disabled={true} />);

      expect(wrapper.getDOMNode().querySelector('input')!.disabled).toEqual(true);
    });

    it('should render a readonly input element', () => {
      wrapper = mount(<TextField readOnly={true} />);

      expect(wrapper.getDOMNode().querySelector('input')!.readOnly).toEqual(true);
    });

    it('can render description text', () => {
      const testDescription = 'A custom description';
      wrapper = mount(<TextField description={testDescription} />);

      const description = wrapper.getDOMNode().querySelector('.ms-TextField-description');
      expect(description).toBeTruthy();
      expect(description!.textContent).toEqual(testDescription);
    });

    it('can render a static custom description without description text', () => {
      const onRenderDescription = jest.fn(() => {
        return <strong>A custom description</strong>;
      });

      renderIntoDocument(<TextField onRenderDescription={onRenderDescription} />);

      expect(onRenderDescription).toHaveBeenCalledTimes(1);
    });
  }); // end basic props

  describe('error message', () => {
    const errorMessage = 'The string is too long, should not exceed 3 characters.';

    function assertErrorMessage(renderedDOM: Element, expectedErrorMessage: string | boolean): void {
      const errorMessageDOM = renderedDOM.querySelector('[data-automation-id=error-message]');

      if (expectedErrorMessage === false) {
        expect(errorMessageDOM).toBeNull(); // element not exists
      } else {
        expect(errorMessageDOM!.textContent).toEqual(expectedErrorMessage);
      }
    }

    it('should render error message when onGetErrorMessage returns a string', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      wrapper = mount(
        <TextField label="text-field-label" defaultValue="whatever value" onGetErrorMessage={validator} deferredValidationTime={5} />
      );

      const inputDOM = wrapper.getDOMNode().querySelector('input');
      ReactTestUtils.Simulate.change(inputDOM!, mockEvent('the input value'));

      // Validation is delayed, so we must wait to check the error message
      return delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), errorMessage));
    });

    it('should render error message when onGetErrorMessage returns a Promise<string>', () => {
      function validator(value: string): Promise<string> {
        return Promise.resolve(value.length > 3 ? errorMessage : '');
      }

      wrapper = mount(
        <TextField label="text-field-label" defaultValue="whatever value" onGetErrorMessage={validator} deferredValidationTime={5} />
      );

      const inputDOM = wrapper.getDOMNode().querySelector('input');
      ReactTestUtils.Simulate.change(inputDOM as Element, mockEvent('the input value'));

      // Validation is delayed, so we must wait to check the error message
      return delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a string', () => {
      wrapper = mount(<TextField label="text-field-label" defaultValue="whatever value" onGetErrorMessage={() => errorMessage} />);

      return delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a Promise<string>', () => {
      wrapper = mount(
        <TextField label="text-field-label" defaultValue="whatever value" onGetErrorMessage={() => Promise.resolve(errorMessage)} />
      );

      // The Promise based validation need to assert with async pattern.
      return delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), errorMessage));
    });

    it('should not render error message when onGetErrorMessage return an empty string', () => {
      wrapper = mount(<TextField label="text-field-label" defaultValue="whatever value" onGetErrorMessage={() => ''} />);

      delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), /* exist */ false));
    });

    it('should not render error message when no value is provided', () => {
      let actualValue: string | undefined = undefined;

      wrapper = mount(<TextField label="text-field-label" onGetErrorMessage={(value: string) => (actualValue = value)} />);

      delay(20).then(() => assertErrorMessage(wrapper.getDOMNode(), /* exist */ false));
      expect(actualValue).toEqual('');
    });

    it('should update error message when receive new value from props', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      jest.useFakeTimers();

      wrapper = mount(<TextField value="initial value" onChange={noOp} onGetErrorMessage={validator} />);

      jest.runOnlyPendingTimers();
      assertErrorMessage(wrapper.getDOMNode(), errorMessage);

      wrapper.setProps({ value: '' });
      jest.runOnlyPendingTimers();

      assertErrorMessage(wrapper.getDOMNode(), /* exist */ false);
    });

    it('should not validate when receiving props when validating only on focus in', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      jest.useFakeTimers();

      wrapper = mount(
        <TextField
          validateOnFocusIn
          value="initial value"
          onChange={noOp}
          onGetErrorMessage={validatorSpy}
          validateOnLoad={false}
          deferredValidationTime={0}
        />
      );
      expect(validationCallCount).toEqual(0);
      assertErrorMessage(wrapper.getDOMNode(), false);

      wrapper.setProps({ value: 'failValidationValue' });
      jest.runOnlyPendingTimers();

      expect(validationCallCount).toEqual(0);
      assertErrorMessage(wrapper.getDOMNode(), false);
    });

    it('should not validate when receiving props when validating only on focus out', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      jest.useFakeTimers();

      wrapper = mount(
        <TextField
          validateOnFocusOut
          value="initial value"
          onChange={noOp}
          onGetErrorMessage={validatorSpy}
          validateOnLoad={false}
          deferredValidationTime={0}
        />
      );
      expect(validationCallCount).toEqual(0);
      assertErrorMessage(wrapper.getDOMNode(), false);

      wrapper.setProps({ value: 'failValidationValue' });
      jest.runOnlyPendingTimers();

      expect(validationCallCount).toEqual(0);
      assertErrorMessage(wrapper.getDOMNode(), false);
    });

    it('should trigger validation only on focus', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validatorSpy} validateOnFocusIn />);

      const inputDOM = wrapper.getDOMNode().querySelector('input') as Element;
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input '));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(3);
    });

    it('should trigger validation only on blur', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validatorSpy} validateOnFocusOut />);

      const inputDOM = wrapper.getDOMNode().querySelector('input') as Element;
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input va'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('the input value'));

      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(3);
    });

    it('should trigger validation on both blur and focus', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validatorSpy} validateOnFocusOut validateOnFocusIn />);

      const inputDOM = wrapper.getDOMNode().querySelector('input') as Element;
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before focus'));
      expect(validationCallCount).toEqual(1);

      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(2);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before foc'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before focus'));
      ReactTestUtils.Simulate.focus(inputDOM);
      expect(validationCallCount).toEqual(3);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before blur'));
      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(4);

      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before bl'));
      ReactTestUtils.Simulate.input(inputDOM, mockEvent('value before blur'));
      ReactTestUtils.Simulate.blur(inputDOM);
      expect(validationCallCount).toEqual(5);
    });

    it('should not trigger validation on component mount', () => {
      const validatorSpy = jest.fn();

      renderIntoDocument(<TextField defaultValue="initial value" onGetErrorMessage={validatorSpy} validateOnLoad={false} />);
      expect(validatorSpy).toHaveBeenCalledTimes(0);
    });
  }); // end error message

  describe('controlled vs uncontrolled usage in strictMode', () => {
    const value1 = 'value 1';
    const value2 = 'value 2';
    let warnFn: jest.Mock;

    function verifyWarningsAndValue(warningCount: number, value: string) {
      expect(warnFn).toHaveBeenCalledTimes(warningCount);

      const inputDOM = wrapper.getDOMNode().querySelector('input');
      // check both the DOM and the state to ensure they match
      expect(textField.value).toEqual(value);
      expect(inputDOM!.value).toEqual(value);
    }

    beforeEach(() => {
      warnFn = jest.fn();
      setWarningCallback(warnFn);
    });
    afterEach(() => {
      setWarningCallback();
    });

    it('warns if value is provided without onChange', () => {
      mount(<TextField strictMode value="some value" />);
      expect(warnFn).toHaveBeenCalledTimes(1);
    });

    it('does not warn if defaultValue is provided without onChange', () => {
      mount(<TextField strictMode defaultValue="some value" />);
      expect(warnFn).toHaveBeenCalledTimes(0);
    });

    it('does not warn if value and onChange are provided', () => {
      mount(<TextField strictMode value="some value" onChange={noOp} />);
      expect(warnFn).toHaveBeenCalledTimes(0);
    });

    it('does not warn if value and readOnly are provided', () => {
      mount(<TextField strictMode value="some value" readOnly />);
      expect(warnFn).toHaveBeenCalledTimes(0);
    });

    // If we wanted to match all the warnings React gives on invalid <input> props, we should also
    // give a warning like the following if value is null:
    // "Warning: `value` prop on `TextFieldBase` should not be null.
    //   Consider using an empty string to clear the component or `undefined` for uncontrolled components."
    // it('warns if value is null', () => {
    //   mount(<TextField strictMode value={null as any} onChange={noOp} />);
    //   expect(warnFn).toHaveBeenCalledTimes(1);
    // });

    it('does not warn if value is empty string', () => {
      mount(<TextField strictMode value="" onChange={noOp} />);
      expect(warnFn).toHaveBeenCalledTimes(0);
    });

    it('does not warn if defaultValue is null', () => {
      mount(<TextField strictMode defaultValue={null as any} />);
      expect(warnFn).toHaveBeenCalledTimes(0);
    });

    it('warns if both value and defaultValue are provided, uses value', () => {
      wrapper = mount(<TextField strictMode value={value1} defaultValue={value2} onChange={noOp} componentRef={textFieldRef} />);
      verifyWarningsAndValue(1, value1);
    });

    it('respects updates to value', () => {
      wrapper = mount(<TextField strictMode value={value1} onChange={noOp} componentRef={textFieldRef} />);

      // should respect updating to non-empty string
      wrapper.setProps({ value: value2, onChange: noOp });
      verifyWarningsAndValue(0, value2);

      // should respect updating to empty string
      wrapper.setProps({ value: '', onChange: noOp });
      verifyWarningsAndValue(0, '');
    });

    it('respects updates and does not warn if value goes from undefined to provided', () => {
      // React's <input> warns in this case, but we don't
      wrapper = mount(<TextField strictMode onChange={noOp} componentRef={textFieldRef} />);
      expect(warnFn).toHaveBeenCalledTimes(0);

      wrapper.setProps({ value: value1, onChange: noOp });
      verifyWarningsAndValue(0, value1);
    });

    it('ignores update and warns if value goes from provided to undefined', () => {
      wrapper = mount(<TextField strictMode value={value1} onChange={noOp} componentRef={textFieldRef} />);
      expect(warnFn).toHaveBeenCalledTimes(0);

      wrapper.setProps({ value: undefined, onChange: noOp });
      verifyWarningsAndValue(1, value1);
    });

    it('ignores updates to defaultValue', () => {
      wrapper = mount(<TextField strictMode defaultValue={value1} componentRef={textFieldRef} />);

      wrapper.setProps({ defaultValue: value2 });
      verifyWarningsAndValue(0, value1);
    });

    it('ignores if defaultValue goes from undefined to provided', () => {
      wrapper = mount(<TextField strictMode componentRef={textFieldRef} />);

      wrapper.setProps({ defaultValue: value1 });
      verifyWarningsAndValue(0, '');
    });
  }); // end controlled vs uncontrolled usage

  describe('when strictMode is false', () => {
    it('should NOT update state when props value remains undefined on props update', () => {
      const stateValue = 'state value';
      wrapper = mount(<TextField componentRef={textFieldRef} />);
      expect((textField as TextFieldBase).state.value).toEqual('');

      (textField as TextFieldBase).setState({ value: stateValue });
      expect((textField as TextFieldBase).state.value).toEqual(stateValue);

      // Trigger a props update, but value prop remains the same undefined value,
      //    so state should not be affected.
      wrapper.setProps({ id: 'unimportantValue' });
      expect((textField as TextFieldBase).state.value).toEqual(stateValue);
    });

    it('should update state when props value changes from defined to undefined', () => {
      const propsValue = 'props value';

      wrapper = mount(<TextField value={propsValue} componentRef={textFieldRef} />);
      expect((textField as TextFieldBase).state.value).toEqual(propsValue);

      wrapper.setProps({ value: undefined });
      expect((textField as TextFieldBase).state.value).toEqual('');
    });

    it('should update value when defaultValue changes and value prop is not set', () => {
      const defaultValue1 = 'default value 1';
      const defaultValue2 = 'default value 2';

      wrapper = mount(<TextField defaultValue={defaultValue1} />);
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual(defaultValue1);

      wrapper.setProps({ defaultValue: defaultValue2 });
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual(defaultValue2);

      wrapper.setProps({ defaultValue: undefined });
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual('');
    });

    it('should not update value when defaultValue changes and value prop is set', () => {
      const defaultValue1 = 'default value 1';
      const defaultValue2 = 'default value 2';
      const testValue = 'test value';

      wrapper = mount(<TextField defaultValue={defaultValue1} />);
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual(defaultValue1);

      wrapper.setProps({ value: testValue, defaultValue: defaultValue2 });
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual(testValue);

      wrapper.setProps({ defaultValue: undefined });
      expect(wrapper.getDOMNode().querySelector('input')).toBeTruthy();
      expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual(testValue);
    });
  });

  describe('onChange', () => {
    const initialValue = 'initial value';
    let onChange: jest.Mock;

    /**
     * Simulate a change event and verify the result.
     * @param changeValue The value to use in the change event
     * @param calls Expected total of onChange calls after the change event
     * @param expectedValue Expected field value after the change event (defaults to `changeValue`)
     */
    function simulateAndVerifyChange(changeValue: string, calls: number, expectedValue?: string) {
      expectedValue = typeof expectedValue === 'string' ? expectedValue : changeValue;

      const inputDOM = wrapper.getDOMNode().querySelector('input')!;
      ReactTestUtils.Simulate.change(inputDOM, mockEvent(changeValue));

      expect(onChange).toHaveBeenCalledTimes(calls);
      expect(textField.value).toEqual(expectedValue);
      expect(inputDOM.value).toEqual(expectedValue);
    }

    beforeEach(() => {
      onChange = jest.fn();
    });

    it('should be called for input change and apply edits if uncontrolled (not strict)', () => {
      wrapper = mount(<TextField componentRef={textFieldRef} defaultValue={initialValue} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);
      simulateAndVerifyChange('value change', 1);
      simulateAndVerifyChange('', 2);
    });

    it('should not be called when initial value is undefined and input change is an empty string (not strict)', () => {
      wrapper = mount(<TextField componentRef={textFieldRef} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);
      simulateAndVerifyChange('', 0);
    });

    it('should be called for input change and apply edits if uncontrolled', () => {
      wrapper = mount(<TextField strictMode componentRef={textFieldRef} defaultValue={initialValue} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);
      simulateAndVerifyChange('value change', 1);
      simulateAndVerifyChange('', 2);
    });

    it('should not be called when initial value is undefined and input change is an empty string', () => {
      wrapper = mount(<TextField strictMode componentRef={textFieldRef} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);
      simulateAndVerifyChange('', 0);
    });

    it('should apply edits if implicitly uncontrolled', () => {
      wrapper = mount(<TextField strictMode componentRef={textFieldRef} onChange={onChange} />);

      simulateAndVerifyChange('value change', 1);
    });

    it('should not apply edits if controlled', () => {
      wrapper = mount(<TextField strictMode componentRef={textFieldRef} value={initialValue} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);
      simulateAndVerifyChange('value change', 1, initialValue);
    });

    it('should not be called with a persisted event', () => {
      let textFieldTarget: any = null;
      const onChangeSpy = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
        textFieldTarget = ev.target;
      };

      const wrapperOne = mount(<TextField onChange={onChangeSpy} />);
      const wrapperTwo = mount(<TextField onChange={onChangeSpy} />);

      const inputDOMOne = wrapperOne.getDOMNode().querySelector('input') as Element;
      const inputDOMTwo = wrapperTwo.getDOMNode().querySelector('input') as Element;

      const valueOne = 'textfield one';
      const valueTwo = 'textfield two';

      ReactTestUtils.Simulate.input(inputDOMOne, mockEvent(valueOne));
      expect(textFieldTarget!.value).toEqual(valueOne);

      ReactTestUtils.Simulate.change(inputDOMTwo, mockEvent(valueTwo));
      expect(textFieldTarget!.value).toEqual(valueTwo);
    });
  }); // end on change

  it('should select a range of text', () => {
    const initialValue = 'initial value';

    const onSelect = () => {
      const selectedText = window.getSelection().toString();
      expect(selectedText).toEqual(initialValue);
    };

    renderIntoDocument(<TextField componentRef={textFieldRef} defaultValue={initialValue} onSelect={onSelect} />);

    textField.setSelectionRange(0, initialValue.length);
  });

  it('sets focus to the input via ITextField focus', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} />);
    const inputEl = wrapper.find('input').getDOMNode();

    textField.focus();

    expect(document.activeElement).toBe(inputEl);
  });

  it('blurs the input via ITextField blur', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} />);
    const inputEl = wrapper.find('input').getDOMNode();

    textField.focus();
    expect(document.activeElement).toBe(inputEl);

    textField.blur();
    expect(document.activeElement).toBe(document.body);
  });

  it('can switch from single to multi line and back', () => {
    const getInput = () => wrapper.getDOMNode().querySelector('input');
    const getTextarea = () => wrapper.getDOMNode().querySelector('textarea');

    // start as single line
    wrapper = mount(<TextField />);
    expect(getInput()).toBeTruthy();
    expect(getTextarea()).toBeNull();

    // switch to multiline
    wrapper.setProps({ multiline: true });
    expect(getTextarea()).toBeTruthy();
    expect(getInput()).toBeNull();

    // switch back
    wrapper.setProps({ multiline: false });
    expect(getInput()).toBeTruthy();
    expect(getTextarea()).toBeNull();
  });

  it('maintains focus when switching single to multi line and back', () => {
    wrapper = mountAttached(<TextField componentRef={textFieldRef} />);
    // focus input
    textField.focus();
    let input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).toBe(input);

    // switch to multiline
    wrapper.setProps({ multiline: true });
    // verify still focused
    const textarea = wrapper.find('textarea').getDOMNode();
    expect(document.activeElement).toBe(textarea);

    // back to single line
    wrapper.setProps({ multiline: false });
    // verify still focused
    input = wrapper.find('input').getDOMNode();
    expect(document.activeElement).toBe(input);
  });

  it('maintains selection when switching single to multi line and back', () => {
    const start = 1;
    const end = 3;
    wrapper = mountAttached(<TextField componentRef={textFieldRef} defaultValue="some text" />);
    // select
    textField.focus();
    textField.setSelectionRange(start, end);
    expect(textField.selectionStart).toBe(start);
    expect(textField.selectionEnd).toBe(end);

    // switch to multiline
    wrapper.setProps({ multiline: true });
    // verify still selected
    expect(textField.selectionStart).toBe(start);
    expect(textField.selectionEnd).toBe(end);

    // back to single line
    wrapper.setProps({ multiline: false });
    // verify still selected
    expect(textField.selectionStart).toBe(start);
    expect(textField.selectionEnd).toBe(end);
  });
});
