import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { resetIds } from '../../Utilities';

import { TextField } from './TextField';
import { TextFieldBase } from './TextField.base';
import { ITextFieldStyles, ITextField } from './TextField.types';
import { mockEvent, renderIntoDocument } from '../../common/testUtilities';

describe('TextField', () => {
  const textFieldRef = React.createRef<TextFieldBase>();

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Mounts the element attached to a child of document.body. This is primarily for tests involving
   * event handlers (which don't work right unless the element is attached).
   */
  function mountAttached(element: React.ReactElement<any>) {
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    return mount(element, { attachTo: parent });
  }

  function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millisecond));
  }

  it('renders TextField correctly', () => {
    const className = 'testClassName';
    const inputClassName = 'testInputClassName';
    const component = renderer.create(<TextField label="Label" className={className} inputClassName={inputClassName} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders TextField multiline unresizable correctly', () => {
    const component = renderer.create(<TextField label="Label" multiline={true} resizable={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders TextField multiline resizable correctly', () => {
    const component = renderer.create(<TextField label="Label" multiline={true} resizable={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiline TextField correctly with props affecting styling', () => {
    const component = renderer.create(
      <TextField label="Label" errorMessage={'test message'} underlined={true} prefix={'test prefix'} suffix={'test suffix'} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders multiline TextField correctly with errorMessage', () => {
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

  it('should render label and value to input element', () => {
    const exampleLabel = 'this is label';
    const exampleValue = 'this is value';

    const textField = mount(<TextField label={exampleLabel} value={exampleValue} />);

    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(exampleValue);
    expect(textField.getDOMNode().querySelector('label')!.textContent).toEqual(exampleLabel);
  });

  it('should render prefix in input element', () => {
    const examplePrefix = 'this is a prefix';

    const textField = mount(<TextField prefix={examplePrefix} />);

    // Assert on the prefix
    const prefixDOM: Element = textField.getDOMNode().getElementsByClassName('ms-TextField-prefix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
  });

  it('should render suffix in input element', () => {
    const exampleSuffix = 'this is a suffix';

    const textField = mount(<TextField suffix={exampleSuffix} />);

    // Assert on the suffix
    const suffixDOM: Element = textField.getDOMNode().getElementsByClassName('ms-TextField-suffix')[0];
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });

  it('should render both prefix and suffix in input element', () => {
    const examplePrefix = 'this is a prefix';
    const exampleSuffix = 'this is a suffix';

    const textField = mount(<TextField prefix={examplePrefix} suffix={exampleSuffix} />);

    // Assert on the prefix and suffix
    const prefixDOM: Element = textField.getDOMNode().getElementsByClassName('ms-TextField-prefix')[0];
    const suffixDOM: Element = textField.getDOMNode().getElementsByClassName('ms-TextField-suffix')[0];
    expect(prefixDOM.textContent).toEqual(examplePrefix);
    expect(suffixDOM.textContent).toEqual(exampleSuffix);
  });

  it('should render multiline as text area element', () => {
    const testText = 'This\nIs\nMultiline\nText\n';
    const textField = mount(<TextField value={testText} multiline />);

    expect(textField.getDOMNode().querySelector('textarea')!.value).toEqual(testText);
  });

  it('should associate the label and input box', () => {
    const textField = mount(<TextField label="text-field-label" value="whatever value" />);

    const inputDOM = textField.getDOMNode().querySelector('input');
    const labelDOM = textField.getDOMNode().querySelector('label');

    // Assert the input ID and label FOR attribute are the same.
    expect(inputDOM!.id).toBeDefined();
    expect(inputDOM!.id).toEqual(labelDOM!.htmlFor);
  });

  it('should render a disabled input element', () => {
    const textField = mount(<TextField disabled={true} />);

    expect(textField.getDOMNode().querySelector('input')!.disabled).toEqual(true);
  });

  it('should render a readonly input element', () => {
    const textField = mount(<TextField readOnly={true} />);

    expect(textField.getDOMNode().querySelector('input')!.readOnly).toEqual(true);
  });

  it('should render a value of 0 when given the number 0', () => {
    const textField = mount(<TextField value={0 as any} />);

    expect(textField.getDOMNode().querySelector('input')!.value).toEqual('0');
  });

  it('should render a default value of 0 when given the number 0', () => {
    const textField = mount(<TextField defaultValue={0 as any} />);

    expect(textField.getDOMNode().querySelector('input')!.defaultValue).toEqual('0');
  });

  it('should NOT update state when props value remains undefined on props update', () => {
    const stateValue = 'state value';
    const textField = mount(<TextField componentRef={textFieldRef} />);
    expect(textFieldRef.current!.state.value).toEqual('');

    textFieldRef.current!.setState({ value: stateValue });
    expect(textFieldRef.current!.state.value).toEqual(stateValue);

    // Trigger a props update, but value prop remains the same undefined value,
    //    so state should not be affected.
    textField.setProps({ id: 'unimportantValue' });
    expect(textFieldRef.current!.state.value).toEqual(stateValue);
  });

  it('should update state when props value changes from defined to undefined', () => {
    const propsValue = 'props value';

    const textField = mount(<TextField value={propsValue} componentRef={textFieldRef} />);
    expect(textFieldRef.current!.state.value).toEqual(propsValue);

    textField.setProps({ value: undefined });
    expect(textFieldRef.current!.state.value).toEqual('');
  });

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

      const textField = mount(
        <TextField label="text-field-label" value="whatever value" onGetErrorMessage={validator} deferredValidationTime={5} />
      );

      const inputDOM = textField.getDOMNode().querySelector('input');
      ReactTestUtils.Simulate.change(inputDOM as Element, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(20).then(() => assertErrorMessage(textField.getDOMNode(), errorMessage));
    });

    it('should render error message when onGetErrorMessage returns a Promise<string>', () => {
      function validator(value: string): Promise<string> {
        return Promise.resolve(value.length > 3 ? errorMessage : '');
      }

      const textField = mount(
        <TextField label="text-field-label" value="whatever value" onGetErrorMessage={validator} deferredValidationTime={5} />
      );

      const inputDOM = textField.getDOMNode().querySelector('input');
      ReactTestUtils.Simulate.change(inputDOM as Element, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(20).then(() => assertErrorMessage(textField.getDOMNode(), errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a string', () => {
      const textField = mount(
        <TextField
          label="text-field-label"
          value="whatever value"
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={() => errorMessage}
        />
      );

      return delay(20).then(() => assertErrorMessage(textField.getDOMNode(), errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a Promise<string>', () => {
      const textField = mount(
        <TextField
          label="text-field-label"
          value="whatever value"
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={() => Promise.resolve(errorMessage)}
        />
      );

      // The Promise based validation need to assert with async pattern.
      return delay(20).then(() => assertErrorMessage(textField.getDOMNode(), errorMessage));
    });

    it('should not render error message when onGetErrorMessage return an empty string', () => {
      const textField = mount(
        <TextField
          label="text-field-label"
          value="whatever value"
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={() => ''}
        />
      );

      delay(20).then(() => assertErrorMessage(textField.getDOMNode(), /* exist */ false));
    });

    it('should not render error message when no value is provided', () => {
      let actualValue: string | undefined = undefined;

      const textField = mount(
        <TextField
          label="text-field-label"
          // tslint:disable-next-line:jsx-no-lambda
          onGetErrorMessage={(value: string) => (actualValue = value)}
        />
      );

      delay(20).then(() => assertErrorMessage(textField.getDOMNode(), /* exist */ false));
      expect(actualValue).toEqual('');
    });

    it('should update error message when receive new value from props', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      jest.useFakeTimers();

      const textField = mount(<TextField value="initial value" onGetErrorMessage={validator} />);

      jest.runOnlyPendingTimers();
      assertErrorMessage(textField.getDOMNode(), errorMessage);

      textField.setProps({ value: '' });
      jest.runOnlyPendingTimers();

      assertErrorMessage(textField.getDOMNode(), /* exist */ false);
    });

    it('should not validate when receiving props when validating only on focus in', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      jest.useFakeTimers();

      const textField = mount(
        <TextField
          validateOnFocusIn
          value="initial value"
          onGetErrorMessage={validatorSpy}
          validateOnLoad={false}
          deferredValidationTime={0}
        />
      );
      expect(validationCallCount).toEqual(0);
      assertErrorMessage(textField.getDOMNode(), false);

      textField.setProps({ value: 'failValidationValue' });
      jest.runOnlyPendingTimers();

      expect(validationCallCount).toEqual(0);
      assertErrorMessage(textField.getDOMNode(), false);
    });

    it('should not validate when receiving props when validating only on focus out', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      jest.useFakeTimers();

      const textField = mount(
        <TextField
          validateOnFocusOut
          value="initial value"
          onGetErrorMessage={validatorSpy}
          validateOnLoad={false}
          deferredValidationTime={0}
        />
      );
      expect(validationCallCount).toEqual(0);
      assertErrorMessage(textField.getDOMNode(), false);

      textField.setProps({ value: 'failValidationValue' });
      jest.runOnlyPendingTimers();

      expect(validationCallCount).toEqual(0);
      assertErrorMessage(textField.getDOMNode(), false);
    });

    it('should trigger validation only on focus', () => {
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return value.length > 3 ? errorMessage : '';
      };

      const textField = mount(<TextField value="initial value" onGetErrorMessage={validatorSpy} validateOnFocusIn />);

      const inputDOM = textField.getDOMNode().querySelector('input') as Element;
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

      const textField = mount(<TextField value="initial value" onGetErrorMessage={validatorSpy} validateOnFocusOut />);

      const inputDOM = textField.getDOMNode().querySelector('input') as Element;
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

      const textField = mount(<TextField value="initial value" onGetErrorMessage={validatorSpy} validateOnFocusOut validateOnFocusIn />);

      const inputDOM = textField.getDOMNode().querySelector('input') as Element;
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
      let validationCallCount = 0;
      const validatorSpy = (value: string) => {
        validationCallCount++;
        return '';
      };

      renderIntoDocument(<TextField value="initial value" onGetErrorMessage={validatorSpy} validateOnLoad={false} />);
      expect(validationCallCount).toEqual(0);
    });
  });

  it('can render a default value', () => {
    const textField = mount(<TextField defaultValue="initial value" />);

    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual('initial value');
  });

  it('can render a default value as a textarea', () => {
    const textField = mount(<TextField defaultValue="initial value" multiline={true} />);

    expect(textField.getDOMNode().querySelector('textarea')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('textarea')!.value).toEqual('initial value');
  });

  it('should update value when defaultValue changes and value prop is not set', () => {
    const defaultValue1 = 'default value 1';
    const defaultValue2 = 'default value 2';

    const textField = mount(<TextField defaultValue={defaultValue1} />);
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(defaultValue1);

    textField.setProps({ defaultValue: defaultValue2 });
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(defaultValue2);

    textField.setProps({ defaultValue: undefined });
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual('');
  });

  it('should not update value when defaultValue changes and value prop is set', () => {
    const defaultValue1 = 'default value 1';
    const defaultValue2 = 'default value 2';
    const testValue = 'test value';

    const textField = mount(<TextField defaultValue={defaultValue1} />);
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(defaultValue1);

    textField.setProps({ value: testValue, defaultValue: defaultValue2 });
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(testValue);

    textField.setProps({ defaultValue: undefined });
    expect(textField.getDOMNode().querySelector('input')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('input')!.value).toEqual(testValue);
  });

  it('can render description text', () => {
    const testDescription = 'A custom description';
    const textField = mount(<TextField description={testDescription} />);

    expect(textField.getDOMNode().querySelector('.ms-TextField-description')).toBeTruthy();
    expect(textField.getDOMNode().querySelector('.ms-TextField-description')!.textContent).toEqual(testDescription);
  });

  it('can render a static custom description without description text', () => {
    let callCount = 0;
    const onRenderDescription = () => {
      callCount++;
      return <strong>A custom description</strong>;
    };

    renderIntoDocument(<TextField onRenderDescription={onRenderDescription} />);

    expect(callCount).toEqual(1);
  });

  it('should call onChange handler for input change', () => {
    let callCount = 0;
    const onChangeSpy = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
      callCount++;
    };

    const textField = mount(
      <TextField
        defaultValue="initial value"
        onChange={onChangeSpy}
        // tslint:disable-next-line:jsx-no-lambda
        onGetErrorMessage={value => (value.length > 0 ? '' : 'error')}
      />
    );

    expect(callCount).toEqual(0);
    const inputDOM = textField.getDOMNode().querySelector('input') as Element;

    ReactTestUtils.Simulate.input(inputDOM, mockEvent('value change'));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent('value change'));
    expect(callCount).toEqual(1);

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(callCount).toEqual(2);
  });

  it('should not call onChange when initial value is undefined and input change is an empty string', () => {
    let callCount = 0;
    const onChangeSpy = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
      callCount++;
    };

    const textField = mount(<TextField onChange={onChangeSpy} />);

    expect(callCount).toEqual(0);
    const inputDOM = textField.getDOMNode().querySelector('input') as Element;

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(callCount).toEqual(0);
  });

  it('should call onChange with a persisted event', () => {
    let textFieldTarget: any = null;
    const onChangeSpy = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
      textFieldTarget = ev.target;
    };

    const textFieldOne = mount(<TextField onChange={onChangeSpy} />);
    const textFieldTwo = mount(<TextField onChange={onChangeSpy} />);

    const inputDOMOne = textFieldOne.getDOMNode().querySelector('input') as Element;
    const inputDOMTwo = textFieldTwo.getDOMNode().querySelector('input') as Element;

    const valueOne = 'textfield one';
    const valueTwo = 'textfield two';

    ReactTestUtils.Simulate.input(inputDOMOne, mockEvent(valueOne));
    expect(textFieldTarget!.value).toEqual(valueOne);

    ReactTestUtils.Simulate.change(inputDOMTwo, mockEvent(valueTwo));
    expect(textFieldTarget!.value).toEqual(valueTwo);
  });

  it('should select a range of text', () => {
    const initialValue = 'initial value';

    const onSelect = () => {
      const selectedText = window.getSelection().toString();
      expect(selectedText).toEqual(initialValue);
    };

    renderIntoDocument(<TextField componentRef={textFieldRef} defaultValue={initialValue} onSelect={onSelect} />);

    textFieldRef.current!.setSelectionRange(0, initialValue.length);
  });

  it('sets focus to the input via ITextField focus', () => {
    const wrapper = mount(<TextField componentRef={textFieldRef} />);
    const textField = textFieldRef.current as ITextField;
    const inputEl = wrapper.find('input').getDOMNode();

    textField.focus();

    expect(document.activeElement).toBe(inputEl);
  });

  it('blurs the input via ITextField blur', () => {
    const wrapper = mount(<TextField componentRef={textFieldRef} />);
    const textField = textFieldRef.current as ITextField;
    const inputEl = wrapper.find('input').getDOMNode();

    textField.focus();
    expect(document.activeElement).toBe(inputEl);

    textField.blur();
    expect(document.activeElement).toBe(document.body);
  });

  it('can switch from single to multi line and back', () => {
    // start as single line
    const wrapper = mount(<TextField componentRef={textFieldRef} />);
    let input = wrapper.getDOMNode().querySelector('input');
    expect(input).toBeTruthy();

    // switch to multiline
    wrapper.setProps({ multiline: true });
    const textarea = wrapper.getDOMNode().querySelector('textarea');
    expect(textarea).toBeTruthy();

    // switch back
    wrapper.setProps({ multiline: false });
    input = wrapper.getDOMNode().querySelector('input');
    expect(input).toBeTruthy();
  });

  it('maintains focus when switching single to multi line and back', () => {
    const wrapper = mountAttached(<TextField componentRef={textFieldRef} />);
    const textField = textFieldRef.current as ITextField;
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
    const wrapper = mountAttached(<TextField componentRef={textFieldRef} defaultValue="some text" />);
    const textField = textFieldRef.current as ITextField;
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
