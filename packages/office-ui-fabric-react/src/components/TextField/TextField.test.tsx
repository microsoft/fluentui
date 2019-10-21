import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { renderToStaticMarkup } from 'react-dom/server';

import { resetIds, setWarningCallback, IRefObject, resetControlledWarnings } from '../../Utilities';
import { mountAttached, mockEvent, flushPromises } from '../../common/testUtilities';

import { TextField } from './TextField';
import { TextFieldBase, ITextFieldState } from './TextField.base';
import { ITextFieldProps, ITextFieldStyles, ITextField } from './TextField.types';

// tslint:disable:jsx-no-lambda

/**
 * The currently rendered ITextField.
 * ONLY set if `componentRef={textFieldRef}` is included in the TextField's props.
 */
let textField: ITextField | undefined;
/** Use this as the componentRef when rendering a TextField. */
const textFieldRef: IRefObject<ITextField> = (ref: ITextField | null) => {
  textField = ref!;
};
/** Wrapper of the TextField currently being tested */
let wrapper: ReactWrapper<ITextFieldProps, ITextFieldState, TextFieldBase> | undefined;
const noOp = () => undefined;

function sharedBeforeEach() {
  resetIds();
  resetControlledWarnings();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
  textField = undefined;

  // Do this after umounting the wrapper to make sure any timers cleaned up on unmount are
  // cleaned up in fake timers world
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('TextField snapshots', () => {
  beforeEach(sharedBeforeEach);

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

  it('renders multiline with placeholder correctly', () => {
    const component = renderer.create(<TextField label="Label" multiline={true} placeholder="test placeholder" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiline correctly with props affecting styling', () => {
    const component = renderer.create(
      <TextField label="Label" errorMessage="test message" underlined={true} prefix="test prefix" suffix="test suffix" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiline correctly with errorMessage', () => {
    const component = renderer.create(
      <TextField label="Label" errorMessage="test message" underlined={true} prefix="test prefix" suffix="test suffix" />
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
      <TextField label="Label" errorMessage="test message" underlined={true} prefix="test prefix" suffix="test suffix" styles={styles} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
}); // end snapshots

describe('TextField rendering values from props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('can render a value', () => {
    const testText = 'initial value';
    // use the noOp change handler because onChange is required when value is specified
    wrapper = mount(<TextField value={testText} onChange={noOp} componentRef={textFieldRef} />);
    const input = wrapper.getDOMNode().querySelector('input');
    expect(input!.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('can render a value as a textarea', () => {
    const testText = 'This\nIs\nMultiline\nText\n';
    wrapper = mount(<TextField value={testText} onChange={noOp} multiline componentRef={textFieldRef} />);
    const textarea = wrapper.getDOMNode().querySelector('textarea');
    expect(textarea!.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('should render a value of 0 when given the number 0', () => {
    wrapper = mount(<TextField value={0 as any} onChange={noOp} componentRef={textFieldRef} />);
    expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual('0');
    expect(textField!.value).toEqual('0');
  });

  it('can render a default value', () => {
    const testText = 'initial value';
    wrapper = mount(<TextField defaultValue={testText} componentRef={textFieldRef} />);
    const input = wrapper.getDOMNode().querySelector('input');
    expect(input!.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('can render a default value as a textarea', () => {
    const testText = 'This\nIs\nMultiline\nText\n';
    wrapper = mount(<TextField defaultValue={testText} multiline componentRef={textFieldRef} />);
    const textarea = wrapper.getDOMNode().querySelector('textarea');
    expect(textarea!.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('should render a default value of 0 when given the number 0', () => {
    wrapper = mount(<TextField defaultValue={0 as any} componentRef={textFieldRef} />);
    expect(wrapper.getDOMNode().querySelector('input')!.value).toEqual('0');
    expect(textField!.value).toEqual('0');
  });
}); // end rendering values from props

describe('TextField basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('can render label', () => {
    const exampleLabel = 'this is label';

    wrapper = mount(<TextField label={exampleLabel} />);

    expect(wrapper.getDOMNode().querySelector('label')!.textContent).toEqual(exampleLabel);
  });

  it('should associate the label and input box', () => {
    wrapper = mount(<TextField label="text-field-label" defaultValue="whatever value" />);

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

  it('should not give an aria-labelledby if no label is provided', () => {
    wrapper = mount(<TextField />);

    expect(wrapper.getDOMNode().getAttribute('aria-labelledby')).toBeNull();
  });

  it('should use explicitly defined aria-labelledby prop if one is given', () => {
    const sampleAriaLabelledby = 'sample for aria-labelledby';
    wrapper = mount(<TextField label="text-field-label" aria-labelledby={sampleAriaLabelledby} />);

    const inputDOM = wrapper.getDOMNode().querySelector('input');
    expect(inputDOM!.getAttribute('aria-labelledby')).toEqual(sampleAriaLabelledby);
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

    wrapper = mount(<TextField onRenderDescription={onRenderDescription} />);

    expect(onRenderDescription).toHaveBeenCalledTimes(1);
  });
}); // end basic props

describe('TextField with error message', () => {
  beforeEach(() => {
    sharedBeforeEach();
    jest.useFakeTimers();
  });
  afterEach(sharedAfterEach);

  const errorMessage = 'The string is too long, should not exceed 3 characters.';
  const errorMessageJSX = (
    <span>
      The string is too long,
      <br />
      should not exceed 3 characters.
    </span>
  );

  function assertErrorMessage(renderedDOM: Element, expectedErrorMessage: string | JSX.Element | boolean): void {
    const errorMessageDOM = renderedDOM.querySelector('[data-automation-id=error-message]');

    if (expectedErrorMessage === false) {
      expect(errorMessageDOM).toBeNull(); // element not exists
    } else {
      expect(errorMessageDOM).not.toBeNull();
      if (typeof expectedErrorMessage === 'string') {
        expect(errorMessageDOM!.textContent).toEqual(expectedErrorMessage);
      } else if (typeof expectedErrorMessage !== 'boolean') {
        const xhtml = errorMessageDOM!.innerHTML.replace(/<br>/g, '<br/>');
        expect(xhtml).toEqual(renderToStaticMarkup(expectedErrorMessage));
      }
    }
  }

  it('should not validate on mount when validateOnLoad is false', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField defaultValue="invalid value" onGetErrorMessage={validator} validateOnLoad={false} />);
    expect(validator).toHaveBeenCalledTimes(0);
  });

  it('should validate on mount when validateOnLoad is true', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField defaultValue="invalid value" onGetErrorMessage={validator} validateOnLoad={true} />);
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(1);
  });

  it('should render error message when onGetErrorMessage returns a string', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);

    wrapper.find('input').simulate('input', mockEvent('also invalid'));
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(wrapper.getDOMNode(), errorMessage);
  });

  it('should render error message when onGetErrorMessage returns a JSX.Element', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessageJSX : ''));

    wrapper = mount(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);

    wrapper.find('input').simulate('input', mockEvent('also invalid'));
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(wrapper.getDOMNode(), errorMessageJSX);
  });

  it('should render error message when onGetErrorMessage returns a Promise<string>', () => {
    const validator = jest.fn((value: string) => Promise.resolve(value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);

    wrapper.find('input').simulate('input', mockEvent('also invalid'));

    // Extra rounds of running everything to account for the debounced validator and the promise...
    jest.runAllTimers();
    return flushPromises().then(() => {
      jest.runAllTimers();

      expect(validator).toHaveBeenCalledTimes(1);
      assertErrorMessage(wrapper!.getDOMNode(), errorMessage);
    });
  });

  it('should render error message when onGetErrorMessage returns a Promise<JSX.Element>', () => {
    const validator = jest.fn((value: string) => Promise.resolve(value.length > 3 ? errorMessageJSX : ''));

    wrapper = mount(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);

    wrapper.find('input').simulate('input', mockEvent('also invalid'));

    jest.runAllTimers();
    return flushPromises().then(() => {
      jest.runAllTimers();

      expect(validator).toHaveBeenCalledTimes(1);
      assertErrorMessage(wrapper!.getDOMNode(), errorMessageJSX);
    });
  });

  it('should render error message on first render when onGetErrorMessage returns a string', () => {
    const validator = jest.fn(() => errorMessage);
    wrapper = mount(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(wrapper.getDOMNode(), errorMessage);
  });

  it('should render error message on first render when onGetErrorMessage returns a Promise<string>', () => {
    const validator = jest.fn(() => Promise.resolve(errorMessage));
    wrapper = mount(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);

    jest.runAllTimers();
    return flushPromises().then(() => {
      jest.runAllTimers();

      expect(validator).toHaveBeenCalledTimes(1);
      assertErrorMessage(wrapper!.getDOMNode(), errorMessage);
    });
  });

  it('should not render error message when onGetErrorMessage return an empty string', () => {
    const validator = jest.fn(() => '');
    wrapper = mount(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(wrapper.getDOMNode(), /* exist */ false);
  });

  it('should not render error message when no value is provided', () => {
    let actualValue: string | undefined = undefined;

    wrapper = mount(<TextField onGetErrorMessage={(value: string) => (actualValue = value)} />);
    jest.runAllTimers();

    assertErrorMessage(wrapper.getDOMNode(), /* exist */ false);
    expect(actualValue).toEqual('');
  });

  it('should update error message when receive new value from props', () => {
    function validator(value: string): string {
      return value.length > 3 ? errorMessage : '';
    }

    wrapper = mount(<TextField value="initial value" onChange={noOp} onGetErrorMessage={validator} />);
    jest.runAllTimers();

    assertErrorMessage(wrapper.getDOMNode(), errorMessage);

    wrapper.setProps({ value: '' });
    jest.runAllTimers();

    assertErrorMessage(wrapper.getDOMNode(), /* exist */ false);
  });

  it('should not validate when receiving props when validating only on focus in', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(
      <TextField validateOnFocusIn value="initial value" onChange={noOp} onGetErrorMessage={validator} validateOnLoad={false} />
    );
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(wrapper.getDOMNode(), false);

    wrapper.setProps({ value: 'failValidationValue' });
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(wrapper.getDOMNode(), false);
  });

  it('should not validate when receiving props when validating only on focus out', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(
      <TextField validateOnFocusOut value="initial value" onChange={noOp} onGetErrorMessage={validator} validateOnLoad={false} />
    );
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(wrapper.getDOMNode(), false);

    wrapper.setProps({ value: 'failValidationValue' });
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(wrapper.getDOMNode(), false);
  });

  it('should trigger validation only on focus', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusIn />);

    const input = wrapper.find('input');
    input.simulate('input', mockEvent('invalid value'));
    expect(validator).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(validator).toHaveBeenCalledTimes(2);

    input.simulate('input', mockEvent('also '));
    input.simulate('input', mockEvent('also invalid'));
    input.simulate('focus');
    expect(validator).toHaveBeenCalledTimes(3);
  });

  it('should trigger validation only on blur', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusOut />);

    const input = wrapper.find('input');
    input.simulate('input', mockEvent('invalid value'));
    expect(validator).toHaveBeenCalledTimes(1);

    input.simulate('blur');
    expect(validator).toHaveBeenCalledTimes(2);

    input.simulate('input', mockEvent('also '));
    input.simulate('input', mockEvent('also invalid'));

    input.simulate('blur');
    expect(validator).toHaveBeenCalledTimes(3);
  });

  it('should trigger validation on both blur and focus', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    wrapper = mount(<TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusOut validateOnFocusIn />);

    const input = wrapper.find('input');
    input.simulate('input', mockEvent('value before focus'));
    expect(validator).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(validator).toHaveBeenCalledTimes(2);

    input.simulate('input', mockEvent('value before foc'));
    input.simulate('input', mockEvent('value before focus'));
    input.simulate('focus');
    expect(validator).toHaveBeenCalledTimes(3);

    input.simulate('input', mockEvent('value before blur'));
    input.simulate('blur');
    expect(validator).toHaveBeenCalledTimes(4);

    input.simulate('input', mockEvent('value before bl'));
    input.simulate('input', mockEvent('value before blur'));
    input.simulate('blur');
    expect(validator).toHaveBeenCalledTimes(5);
  });
}); // end error message

describe('TextField controlled vs uncontrolled usage', () => {
  const value1 = 'value 1';
  const value2 = 'value 2';
  let warnFn: jest.Mock;

  function verifyWarningsAndValue(warningCount: number, value: string | undefined) {
    expect(warnFn).toHaveBeenCalledTimes(warningCount);

    const inputDOM = wrapper!.getDOMNode().querySelector('input');
    // check both the DOM and the state to ensure they match
    expect(textField!.value).toEqual(value);
    expect(inputDOM!.value).toEqual(value);
  }

  beforeEach(() => {
    sharedBeforeEach();
    warnFn = jest.fn();
    setWarningCallback(warnFn);
  });
  afterEach(() => {
    sharedAfterEach();
    setWarningCallback();
  });

  it('warns if value is provided without onChange', () => {
    mount(<TextField value="some value" />);
    expect(warnFn).toHaveBeenCalledTimes(1);
  });

  it('does not warn if defaultValue is provided without onChange', () => {
    mount(<TextField defaultValue="some value" />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if value and onChange are provided', () => {
    mount(<TextField value="some value" onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if value and readOnly are provided', () => {
    mount(<TextField value="some value" readOnly />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('warns if value is null', () => {
    mount(<TextField value={null as any} onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(1);
  });

  it('does not warn if value is empty string', () => {
    mount(<TextField value="" onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if defaultValue is null', () => {
    mount(<TextField defaultValue={null as any} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('warns if both value and defaultValue are provided, uses value', () => {
    wrapper = mount(<TextField value={value1} defaultValue={value2} onChange={noOp} componentRef={textFieldRef} />);
    verifyWarningsAndValue(1, value1);
  });

  it('respects updates to value', () => {
    wrapper = mount(<TextField value={value1} onChange={noOp} componentRef={textFieldRef} />);

    // should respect updating to non-empty string
    wrapper.setProps({ value: value2, onChange: noOp });
    verifyWarningsAndValue(0, value2);

    // should respect updating to empty string
    wrapper.setProps({ value: '', onChange: noOp });
    verifyWarningsAndValue(0, '');
  });

  it('respects update and warns if value goes from undefined to provided', () => {
    // React's <input> warns in this case, but we don't
    wrapper = mount(<TextField onChange={noOp} componentRef={textFieldRef} />);
    expect(warnFn).toHaveBeenCalledTimes(0);

    wrapper.setProps({ value: value1, onChange: noOp });
    verifyWarningsAndValue(1, value1);
  });

  it('respects update and warns if value goes from provided to undefined', () => {
    wrapper = mount(<TextField value={value1} onChange={noOp} componentRef={textFieldRef} />);
    expect(warnFn).toHaveBeenCalledTimes(0);

    wrapper.setProps({ value: undefined, onChange: noOp });

    expect(warnFn).toHaveBeenCalledTimes(1);
    const inputDOM = wrapper.getDOMNode().querySelector('input');
    expect(textField!.value).toEqual(undefined);
    expect(inputDOM!.value).toEqual('');
  });

  it('ignores updates to defaultValue', () => {
    wrapper = mount(<TextField defaultValue={value1} componentRef={textFieldRef} />);

    wrapper.setProps({ defaultValue: value2 });
    verifyWarningsAndValue(0, value1);
  });

  it('ignores if defaultValue goes from undefined to provided', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} />);

    wrapper.setProps({ defaultValue: value1 });
    verifyWarningsAndValue(0, '');
  });
}); // end controlled vs uncontrolled usage

describe('TextField onChange', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

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

    const input = wrapper!.find('input');
    // Fire input AND change events to more realistically test
    input.simulate('input', mockEvent(changeValue));
    input.simulate('change', mockEvent(changeValue));

    expect(onChange).toHaveBeenCalledTimes(calls);
    expect(textField!.value).toEqual(expectedValue);
    expect((input.getDOMNode() as HTMLInputElement).value).toEqual(expectedValue);
  }

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should be called for input change and apply edits if uncontrolled', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} defaultValue={initialValue} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1);
    simulateAndVerifyChange('', 2);
  });

  it('should not be called when initial value is undefined and input change is an empty string', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('', 0);
  });

  it('should apply edits if implicitly uncontrolled', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} onChange={onChange} />);

    simulateAndVerifyChange('value change', 1);
  });

  it('should not apply edits if controlled', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} value={initialValue} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1, initialValue);
  });

  it('should not apply edits if controlled (empty initial value)', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1, '');
  });

  it('respects prop updates in response to onChange', () => {
    onChange = jest.fn((ev: any, value?: string) => wrapper!.setProps({ value }));
    wrapper = mount(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    simulateAndVerifyChange('a', 1);
  });

  it('should apply edits after clearing field', () => {
    onChange = jest.fn((ev: any, value?: string) => wrapper!.setProps({ value }));
    wrapper = mount(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    simulateAndVerifyChange('a', 1);

    // clear the value manually (not via a change event)
    wrapper.setProps({ value: '' });

    // updating to the same value as before should be respected
    simulateAndVerifyChange('a', 2);
  });
}); // end on change

// Other things that don't fit into a category above
describe('TextField', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('should select a range of text', () => {
    const initialValue = 'initial value';

    const onSelect = () => {
      const selectedText = window.getSelection();
      expect(selectedText).toBeDefined();
      expect(selectedText!.toString()).toEqual(initialValue);
    };

    ReactTestUtils.renderIntoDocument(<TextField componentRef={textFieldRef} defaultValue={initialValue} onSelect={onSelect} />);

    textField!.setSelectionRange(0, initialValue.length);
  });

  it('sets focus to the input via ITextField focus', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} />);
    const inputEl = wrapper.find('input').getDOMNode();

    textField!.focus();

    expect(document.activeElement).toBe(inputEl);
  });

  it('blurs the input via ITextField blur', () => {
    wrapper = mount(<TextField componentRef={textFieldRef} />);
    const inputEl = wrapper.find('input').getDOMNode();

    textField!.focus();
    expect(document.activeElement).toBe(inputEl);

    textField!.blur();
    expect(document.activeElement).toBe(document.body);
  });

  it('can switch from single to multi line and back', () => {
    const getInput = () => wrapper!.getDOMNode().querySelector('input');
    const getTextarea = () => wrapper!.getDOMNode().querySelector('textarea');

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
    textField!.focus();
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
    textField!.focus();
    textField!.setSelectionRange(start, end);
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);

    // switch to multiline
    wrapper.setProps({ multiline: true });
    // verify still selected
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);

    // back to single line
    wrapper.setProps({ multiline: false });
    // verify still selected
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);
  });
});
