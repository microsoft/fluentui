import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToStaticMarkup } from 'react-dom/server';

import * as path from 'path';
import { resetIds, setWarningCallback, resetControlledWarnings } from '../../Utilities';
import { flushPromises } from '../../common/testUtilities';

import { TextField } from './TextField';
import { isConformant } from '../../common/isConformant';
import type { IRefObject } from '../../Utilities';
import type { ITextFieldStyles, ITextField } from './TextField.types';

/**
 * The currently rendered ITextField.
 * ONLY set if `componentRef={textFieldRef}` is included in the TextField's props.
 */
let textField: ITextField | undefined;
/** Use this as the componentRef when rendering a TextField. */
const textFieldRef: IRefObject<ITextField> = (ref: ITextField | null) => {
  textField = ref!;
};

const noOp = () => undefined;

function sharedBeforeEach() {
  resetIds();
  resetControlledWarnings();
}

function sharedAfterEach() {
  textField = undefined;

  // Do this after unmounting the wrapper to make sure any timers cleaned up on unmount are
  // cleaned up in fake timers world
  jest.useRealTimers();
}

describe('TextField snapshots', () => {
  beforeEach(sharedBeforeEach);

  it('renders correctly', () => {
    const className = 'testClassName';
    const inputClassName = 'testInputClassName';
    const { container } = render(<TextField label="Label" className={className} inputClassName={inputClassName} />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiline non resizable correctly', () => {
    const { container } = render(<TextField label="Label" multiline={true} resizable={false} />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiline resizable correctly', () => {
    const { container } = render(<TextField label="Label" multiline={true} resizable={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiline with placeholder correctly', () => {
    const { container } = render(<TextField label="Label" multiline={true} placeholder="test placeholder" />);
    expect(container).toMatchSnapshot();
  });

  it('renders multiline correctly with props affecting styling', () => {
    const { container } = render(
      <TextField
        label="Label"
        errorMessage="test message"
        underlined={true}
        prefix="test prefix"
        suffix="test suffix"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders multiline correctly with errorMessage', () => {
    const { container } = render(
      <TextField
        label="Label"
        errorMessage="test message"
        underlined={true}
        prefix="test prefix"
        suffix="test suffix"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should respect user component and subcomponent styling', () => {
    const styles: Partial<ITextFieldStyles> = {
      root: 'root-testClassName',
      subComponentStyles: {
        label: {
          root: 'label-testClassName',
        },
      },
    };
    const { container } = render(
      <TextField
        label="Label"
        errorMessage="test message"
        underlined={true}
        prefix="test prefix"
        suffix="test suffix"
        styles={styles}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with reveal password button', () => {
    const { container } = render(<TextField type="password" canRevealPassword />);
    expect(container).toMatchSnapshot();
  });
}); // end snapshots

describe('TextField', () => {
  beforeEach(sharedBeforeEach);

  isConformant({
    Component: TextField,
    displayName: 'TextField',
    componentPath: path.join(__dirname, 'TextField.ts'),
    elementRefName: 'elementRef',
  });
});

describe('TextField rendering values from props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('can render a value', () => {
    const testText = 'initial value';
    // use the noOp change handler because onChange is required when value is specified
    const { getByRole } = render(<TextField value={testText} onChange={noOp} componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('can render a value as a textarea', () => {
    const testText = 'This\nIs\nMultiline\nText\n';
    const { getByRole } = render(<TextField value={testText} onChange={noOp} multiline componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('should render a value of 0 when given the number 0', () => {
    const { getByRole } = render(<TextField value={0 as any} onChange={noOp} componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual('0');
    expect(textField!.value).toEqual('0');
  });

  it('can render a default value', () => {
    const testText = 'initial value';
    const { getByRole } = render(<TextField defaultValue={testText} componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('can render a default value as a textarea', () => {
    const testText = 'This\nIs\nMultiline\nText\n';
    const { getByRole } = render(<TextField defaultValue={testText} multiline componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual(testText);
    expect(textField!.value).toEqual(testText);
  });

  it('should render a default value of 0 when given the number 0', () => {
    const { getByRole } = render(<TextField defaultValue={0 as any} componentRef={textFieldRef} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual('0');
    expect(textField!.value).toEqual('0');
  });
}); // end rendering values from props

describe('TextField basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('can render label', () => {
    const exampleLabel = 'this is label';
    const { container } = render(<TextField label={exampleLabel} />);
    expect(container.querySelector('label')!.textContent).toEqual(exampleLabel);
  });
  it('should associate the label and input box', () => {
    const { container, getByRole } = render(<TextField label="text-field-label" defaultValue="whatever value" />);
    const inputDOM = getByRole('textbox') as HTMLInputElement;
    const labelDOM = container.querySelector('label')!;
    // Assert the input ID and label FOR attribute are the same.
    expect(inputDOM!.id).toBeTruthy();
    expect(inputDOM!.id).toEqual(labelDOM!.htmlFor);
  });
  it('should render prefix', () => {
    const examplePrefix = 'this is a prefix';
    const { container } = render(<TextField prefix={examplePrefix} />);
    const prefixDOM: Element = container.getElementsByClassName('ms-TextField-prefix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
  });
  it('should render suffix', () => {
    const exampleSuffix = 'this is a suffix';
    const { container } = render(<TextField suffix={exampleSuffix} />);
    const suffixDOM: Element = container.getElementsByClassName('ms-TextField-suffix')[0];
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });
  it('should render both prefix and suffix', () => {
    const examplePrefix = 'this is a prefix';
    const exampleSuffix = 'this is a suffix';
    const { container } = render(<TextField prefix={examplePrefix} suffix={exampleSuffix} />);
    // Assert on the prefix and suffix
    const prefixDOM: Element = container.getElementsByClassName('ms-TextField-prefix')[0];
    const suffixDOM: Element = container.getElementsByClassName('ms-TextField-suffix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });
  it('should not render reveal password button by default', () => {
    const { container } = render(<TextField type="password" />);
    expect(container.querySelectorAll('.ms-TextField-reveal')).toHaveLength(0);
  });
  it('should render reveal password button if canRevealPassword=true', () => {
    const { container } = render(<TextField type="password" canRevealPassword />);
    expect(container.querySelectorAll('.ms-TextField-reveal')).toHaveLength(1);
  });
  it('ignores canRevealPassword if type is unspecified', () => {
    const { container } = render(<TextField canRevealPassword />);
    expect(container.querySelectorAll('.ms-TextField-reveal')).toHaveLength(0);
  });
  it('ignores canRevealPassword if type is not password', () => {
    const { container } = render(<TextField type="text" canRevealPassword />);
    expect(container.querySelectorAll('.ms-TextField-reveal')).toHaveLength(0);
  });
  it('should toggle reveal password on reveal button click', () => {
    const { container, getByRole } = render(<TextField type="password" canRevealPassword={true} />);
    const input = container.querySelector('.ms-TextField-field')! as HTMLInputElement;
    const reveal = getByRole('button');

    userEvent.type(input, 'Password123$');
    expect(input.type).toEqual('password');
    userEvent.click(reveal);
    expect(input.type).toEqual('text');
    userEvent.click(reveal);
    expect(input.type).toEqual('password');
  });
  it('should not give an aria-labelledby if no label is provided', () => {
    const { getByRole } = render(<TextField />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.getAttribute('aria-labelledby')).toBeNull();
  });
  it('should use explicitly defined aria-labelledby prop if one is given', () => {
    const sampleAriaLabelledby = 'sample for aria-labelledby';
    const { getByRole } = render(<TextField label="text-field-label" aria-labelledby={sampleAriaLabelledby} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.getAttribute('aria-labelledby')).toEqual(sampleAriaLabelledby);
  });
  it('should render a disabled input element', () => {
    const { getByRole } = render(<TextField disabled={true} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toEqual(true);
  });
  it('should render a readonly input element', () => {
    const { getByRole } = render(<TextField readOnly={true} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.readOnly).toEqual(true);
  });
  it('can render description text', () => {
    const testDescription = 'A custom description';
    const { container } = render(<TextField description={testDescription} />);
    const description = container.querySelector('.ms-TextField-description');
    expect(description).toBeTruthy();
    expect(description!.textContent).toEqual(testDescription);
  });
  it('can render a static custom description without description text', () => {
    const onRenderDescription = jest.fn(() => {
      return <strong>A custom description</strong>;
    });
    render(<TextField onRenderDescription={onRenderDescription} />);
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

  it('should not validate on render when validateOnLoad is false', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    render(<TextField defaultValue="invalid value" onGetErrorMessage={validator} validateOnLoad={false} />);
    expect(validator).toHaveBeenCalledTimes(0);
  });

  it('should validate on render when validateOnLoad is true', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    render(<TextField defaultValue="invalid value" onGetErrorMessage={validator} validateOnLoad={true} />);
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(1);
  });

  it('should render error message when onGetErrorMessage returns a string', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    const { container, getByRole } = render(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);
    const input = getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'also invalid');
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessage);
  });

  it('should render error message when onGetErrorMessage returns a JSX.Element', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessageJSX : ''));

    const { container, getByRole } = render(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);
    const input = getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'also invalid');
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessageJSX);
  });

  it('should render error message when onGetErrorMessage returns a Promise<string>', async () => {
    const validator = jest.fn((value: string) => Promise.resolve(value.length > 3 ? errorMessage : ''));

    const { container, getByRole } = render(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);
    const input = getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'also invalid');

    // Extra rounds of running everything to account for the debounced validator and the promise...
    jest.runAllTimers();
    await flushPromises();
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessage);
  });

  it('should render error message when onGetErrorMessage returns a Promise<JSX.Element>', async () => {
    const validator = jest.fn((value: string) => Promise.resolve(value.length > 3 ? errorMessageJSX : ''));

    const { container, getByRole } = render(<TextField onGetErrorMessage={validator} validateOnLoad={false} />);
    const input = getByRole('textbox') as HTMLInputElement;

    userEvent.type(input, 'also invalid');

    jest.runAllTimers();
    await flushPromises();
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessageJSX);
  });

  it('should render error message on first render when onGetErrorMessage returns a string', () => {
    const validator = jest.fn(() => errorMessage);
    const { container } = render(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessage);
  });

  it('should render error message on first render when onGetErrorMessage returns a Promise<string>', async () => {
    const validator = jest.fn(() => Promise.resolve(errorMessage));
    const { container } = render(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);

    await flushPromises();
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, errorMessage);
  });

  it('should not render error message when onGetErrorMessage return an empty string', () => {
    const validator = jest.fn(() => '');
    const { container } = render(<TextField defaultValue="invalid value" onGetErrorMessage={validator} />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(1);
    assertErrorMessage(container, /* exist */ false);
  });

  it('should not render error message when no value is provided', () => {
    let actualValue: string | undefined = undefined;

    const { container } = render(<TextField onGetErrorMessage={(value: string) => (actualValue = value)} />);
    jest.runAllTimers();

    assertErrorMessage(container, /* exist */ false);
    expect(actualValue).toEqual('');
  });

  it('should update error message when receive new value from props', () => {
    function validator(value: string): string {
      return value.length > 3 ? errorMessage : '';
    }

    const { container, rerender } = render(
      <TextField value="initial value" onChange={noOp} onGetErrorMessage={validator} />,
    );
    jest.runAllTimers();

    assertErrorMessage(container, errorMessage);

    rerender(<TextField value="" onChange={noOp} onGetErrorMessage={validator} />);
    jest.runAllTimers();

    assertErrorMessage(container, /* exist */ false);
  });

  it('should not validate when receiving props when validating only on focus in', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));
    const baseProps = { validateOnFocusIn: true, onChange: noOp, onGetErrorMessage: validator, validateOnLoad: false };

    const { container, rerender } = render(<TextField {...baseProps} value="initial value" />);
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(container, false);

    rerender(<TextField {...baseProps} value="failValidationValue" />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(container, false);
  });

  it('should not validate when receiving props when validating only on focus out', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));
    const baseProps = { validateOnFocusOut: true, onChange: noOp, onGetErrorMessage: validator, validateOnLoad: false };

    const { container, rerender } = render(<TextField {...baseProps} value="initial value" />);
    jest.runAllTimers();
    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(container, false);

    rerender(<TextField {...baseProps} value="failValidationValue" />);
    jest.runAllTimers();

    expect(validator).toHaveBeenCalledTimes(0);
    assertErrorMessage(container, false);
  });

  it('should trigger validation only on focus', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    const { container, getByRole } = render(
      <TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusIn />,
    );

    const input = getByRole('textbox') as HTMLInputElement;
    userEvent.type(input, 'invalid value');
    expect(validator).toHaveBeenCalledTimes(2);

    userEvent.click(container);
    userEvent.click(input);
    expect(validator).toHaveBeenCalledTimes(3);

    userEvent.click(container);
    userEvent.type(input, 'also ');
    userEvent.type(input, 'also invalid');
    expect(validator).toHaveBeenCalledTimes(4);
  });

  it('should trigger validation only on blur', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    const { container, getByRole } = render(
      <TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusOut />,
    );

    const input = getByRole('textbox') as HTMLInputElement;
    userEvent.type(input, 'invalid value');
    expect(validator).toHaveBeenCalledTimes(1);

    userEvent.click(container);
    expect(validator).toHaveBeenCalledTimes(2);

    userEvent.type(input, 'also ');
    userEvent.type(input, 'also invalid');
    userEvent.click(container);
    expect(validator).toHaveBeenCalledTimes(3);
  });

  it('should trigger validation on both blur and focus', () => {
    const validator = jest.fn((value: string) => (value.length > 3 ? errorMessage : ''));

    const { container, getByRole } = render(
      <TextField defaultValue="initial value" onGetErrorMessage={validator} validateOnFocusOut validateOnFocusIn />,
    );

    const input = getByRole('textbox') as HTMLInputElement;
    userEvent.type(input, 'value before focus', { skipClick: true });
    expect(validator).toHaveBeenCalledTimes(1);

    userEvent.type(input, 'value after foc');
    userEvent.type(input, 'value after focus');
    expect(validator).toHaveBeenCalledTimes(2);
    //triggers blur event
    userEvent.click(container);
    expect(validator).toHaveBeenCalledTimes(3);

    userEvent.type(input, 'value before bl');
    userEvent.type(input, 'value before blur');
    expect(validator).toHaveBeenCalledTimes(4);
    //triggers blur event
    userEvent.click(container);
    expect(validator).toHaveBeenCalledTimes(5);
  });
}); // end error message

describe('TextField controlled vs uncontrolled usage', () => {
  const value1 = 'value 1';
  const value2 = 'value 2';
  let warnFn: jest.Mock;

  function verifyWarningsAndValue(warningCount: number, value: string | undefined) {
    expect(warnFn).toHaveBeenCalledTimes(warningCount);

    const inputDOM = screen.getByRole('textbox') as HTMLInputElement;
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
    render(<TextField value="some value" />);
    expect(warnFn).toHaveBeenCalledTimes(1);
  });

  it('does not warn if defaultValue is provided without onChange', () => {
    render(<TextField defaultValue="some value" />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if value and onChange are provided', () => {
    render(<TextField value="some value" onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if value and readOnly are provided', () => {
    render(<TextField value="some value" readOnly />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('warns if value is null', () => {
    render(<TextField value={null as any} onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(1);
  });

  it('does not warn if value is empty string', () => {
    render(<TextField value="" onChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('does not warn if defaultValue is null', () => {
    render(<TextField defaultValue={null as any} />);
    expect(warnFn).toHaveBeenCalledTimes(0);
  });

  it('warns if both value and defaultValue are provided, uses value', () => {
    render(<TextField value={value1} defaultValue={value2} onChange={noOp} componentRef={textFieldRef} />);
    verifyWarningsAndValue(1, value1);
  });

  it('respects updates to value', () => {
    const { rerender } = render(<TextField value={value1} onChange={noOp} componentRef={textFieldRef} />);

    // should respect updating to non-empty string
    rerender(<TextField value={value2} onChange={noOp} componentRef={textFieldRef} />);
    verifyWarningsAndValue(0, value2);

    // should respect updating to empty string
    rerender(<TextField value={''} onChange={noOp} componentRef={textFieldRef} />);
    verifyWarningsAndValue(0, '');
  });

  it('respects update and warns if value goes from undefined to provided', () => {
    // React's <input> warns in this case, but we don't
    const { rerender } = render(<TextField onChange={noOp} componentRef={textFieldRef} />);
    expect(warnFn).toHaveBeenCalledTimes(0);

    rerender(<TextField value={value1} onChange={noOp} componentRef={textFieldRef} />);
    verifyWarningsAndValue(1, value1);
  });

  it('respects update and warns if value goes from provided to undefined', () => {
    const { rerender, getByRole } = render(<TextField value={value1} onChange={noOp} componentRef={textFieldRef} />);
    expect(warnFn).toHaveBeenCalledTimes(0);

    rerender(<TextField value={undefined} onChange={noOp} componentRef={textFieldRef} />);

    expect(warnFn).toHaveBeenCalledTimes(1);
    const inputDOM = getByRole('textbox') as HTMLInputElement;
    expect(textField!.value).toEqual(undefined);
    expect(inputDOM!.value).toEqual('');
  });

  it('ignores updates to defaultValue', () => {
    const { rerender } = render(<TextField defaultValue={value1} componentRef={textFieldRef} />);

    rerender(<TextField defaultValue={value2} componentRef={textFieldRef} />);
    verifyWarningsAndValue(0, value1);
  });

  it('ignores if defaultValue goes from undefined to provided', () => {
    const { rerender } = render(<TextField componentRef={textFieldRef} />);

    rerender(<TextField componentRef={textFieldRef} defaultValue={value1} />);
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

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: changeValue } });

    expect(onChange).toHaveBeenCalledTimes(calls);
    expect(textField!.value).toEqual(expectedValue);
    expect(input.value).toEqual(expectedValue);
  }

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('should be called for input change and apply edits if uncontrolled', () => {
    render(<TextField componentRef={textFieldRef} defaultValue={initialValue} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1);
    simulateAndVerifyChange('', 2);
  });

  it('should not be called when initial value is undefined and input change is an empty string', () => {
    render(<TextField componentRef={textFieldRef} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('', 0);
  });

  it('should apply edits if implicitly uncontrolled', () => {
    render(<TextField componentRef={textFieldRef} onChange={onChange} />);

    simulateAndVerifyChange('value change', 1);
  });

  it('should not apply edits if controlled', () => {
    render(<TextField componentRef={textFieldRef} value={initialValue} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1, initialValue);
  });

  it('should not apply edits if controlled (empty initial value)', () => {
    render(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);
    simulateAndVerifyChange('value change', 1, '');
  });

  it('respects prop updates in response to onChange', () => {
    onChange = jest.fn((ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) =>
      rerender(<TextField componentRef={textFieldRef} value={value} onChange={onChange} />),
    );
    const { rerender } = render(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    simulateAndVerifyChange('a', 1);
  });

  it('should apply edits after clearing field', () => {
    onChange = jest.fn((ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) =>
      rerender(<TextField componentRef={textFieldRef} value={value} onChange={onChange} />),
    );
    const { rerender } = render(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

    simulateAndVerifyChange('a', 1);

    // clear the value manually (not via a change event)
    rerender(<TextField componentRef={textFieldRef} value="" onChange={onChange} />);

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
      expect(selectedText).toBeTruthy();
      expect(selectedText!.toString()).toEqual(initialValue);
    };

    render(<TextField componentRef={textFieldRef} defaultValue={initialValue} onSelect={onSelect} />);

    textField!.setSelectionRange(0, initialValue.length);
  });

  it('sets focus to the input via ITextField focus', () => {
    const { getByRole } = render(<TextField componentRef={textFieldRef} />);

    const input = getByRole('textbox') as HTMLInputElement;
    textField!.focus();
    expect(document.activeElement).toBe(input);
  });

  it('blurs the input via ITextField blur', () => {
    const { getByRole } = render(<TextField componentRef={textFieldRef} />);

    const input = getByRole('textbox') as HTMLInputElement;

    textField!.focus();
    expect(document.activeElement).toBe(input);

    textField!.blur();
    expect(document.activeElement).toBe(document.body);
  });

  it('can switch from single to multi line and back', () => {
    const getInputField = () => container.querySelector('input');
    const getTextarea = () => container.querySelector('textarea');

    // start as single line
    const { container, rerender } = render(<TextField />);
    expect(getInputField()).toBeTruthy();
    expect(getTextarea()).toBeNull();

    // switch to multiline
    rerender(<TextField multiline={true} />);
    expect(getTextarea()).toBeTruthy();
    expect(getInputField()).toBeNull();

    // switch back
    rerender(<TextField multiline={false} />);
    expect(getInputField()).toBeTruthy();
    expect(getTextarea()).toBeNull();
  });

  it('maintains focus when switching single to multi line and back', () => {
    const { rerender, getByRole } = render(<TextField componentRef={textFieldRef} />);

    // focus input
    textField!.focus();
    expect(document.activeElement).toBe(getByRole('textbox'));

    // switch to multiline
    rerender(<TextField multiline={true} />);
    // verify still focused
    expect(document.activeElement).toBe(getByRole('textbox'));
    // back to single line
    rerender(<TextField multiline={false} />);
    // verify still focused
    expect(document.activeElement).toBe(getByRole('textbox'));
  });

  it('maintains selection when switching single to multi line and back', () => {
    const start = 1;
    const end = 3;
    const { rerender } = render(<TextField componentRef={textFieldRef} defaultValue="some text" />);

    // select
    textField!.focus();
    textField!.setSelectionRange(start, end);
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);

    // switch to multiline
    rerender(<TextField componentRef={textFieldRef} defaultValue="some text" multiline={true} />);
    // verify still selected
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);

    // back to single line
    rerender(<TextField componentRef={textFieldRef} defaultValue="some text" multiline={false} />);
    // verify still selected
    expect(textField!.selectionStart).toBe(start);
    expect(textField!.selectionEnd).toBe(end);
  });
});
