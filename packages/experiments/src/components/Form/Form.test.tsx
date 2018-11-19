/* tslint:disable:no-any no-string-literal jsx-no-lambda */

import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { DEFAULT_DEBOUNCE } from './FormBaseInput';
import { Form } from './Form';
import { FormTextInput } from './inputs/textInput/FormTextInput';
import { IFormProps } from './Form.types';
import { IFormTextInputProps } from './inputs/textInput/FormTextInput.types';
import { Validators } from './validators/Validators';

describe('Form', () => {
  let formProps: IFormProps;
  let formTextInputProps: IFormTextInputProps;
  const formRequiredTestMessage = 'This field is required';
  const formTextBoxValidatorTestMessage = 'Error message for number field';

  describe('Form renders for different props', () => {
    let renderedForm: Form;

    beforeEach(() => {
      (renderedForm as any) = undefined;

      formProps = {
        onSubmit: (value: any) => {
          /* stub */
        }
      };

      formTextInputProps = {
        inputKey: 'field',
        textFieldProps: { label: 'Field' }
      };
    });

    afterEach(() => {
      expect(renderedForm).toBeTruthy();
    });

    it('Null props', () => {
      (formProps.onSubmit as any) = null;
      renderedForm = ReactTestUtils.renderIntoDocument(<Form {...formProps} />) as Form;
    });

    it('One form value', () => {
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form {...formProps}>
          <FormTextInput {...formTextInputProps} />
        </Form>
      ) as Form;

      const textInput: Element = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-TextField');
      expect(textInput).toBeTruthy();
    });

    it('Two form values', () => {
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form {...formProps}>
          <FormTextInput {...formTextInputProps} />
          <FormTextInput {...formTextInputProps} />
        </Form>
      ) as Form;

      const textInputs: Element[] = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedForm, 'ms-TextField');
      expect(textInputs.length).toEqual(2);
    });

    it('Initial form value', () => {
      formTextInputProps.value = 'Value';
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form {...formProps}>
          <FormTextInput {...formTextInputProps} />
        </Form>
      ) as Form;

      const textInput: HTMLInputElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'input') as HTMLInputElement;
      expect(textInput.value).toEqual('Value');
    });
  });

  class ExtendsTextBox extends FormTextInput {
    public setValue(value: string): void {
      super.setValue(value);
    }
  }

  describe('Simple form validates and return values', () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());

      formTextInputProps = {
        inputKey: 'field',
        textFieldProps: { label: 'Field' }
      };
    });

    afterEach(() => {
      clock.restore();
    });

    it('Valid values are returned correctly', () => {
      let result: any;
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            result = value;
          }}
        >
          <FormTextInput inputKey="field" value="Value" />

          <FormTextInput inputKey="fieldnumber" value="2" validators={[Validators.isNumber('')]} />
        </Form>
      ) as Form;
      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      expect(result['field']).toEqual('Value');
      expect(result['fieldnumber']).toEqual('2');
    });

    it('Invalid values are not returned', () => {
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            /*stub*/
          }}
        >
          <FormTextInput inputKey="field" validators={[Validators.required(formRequiredTestMessage)]} value="" />

          <FormTextInput inputKey="field2" value="NAN" validators={[Validators.isNumber(formTextBoxValidatorTestMessage)]} />
        </Form>
      ) as Form;

      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      const textBox: FormTextInput[] = ReactTestUtils.scryRenderedComponentsWithType(renderedForm, FormTextInput);
      expect(textBox[0].state.currentError).toEqual(formRequiredTestMessage);
      expect(textBox[1].state.currentError).toEqual(formTextBoxValidatorTestMessage);
    });

    it('Number fields with initial value of 0 are displayed properly', () => {
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            /*stub*/
          }}
        >
          <FormTextInput inputKey="field" value="0" />
        </Form>
      ) as Form;
      const numberField: HTMLDivElement = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        renderedForm,
        'ms-TextField'
      )[0] as HTMLDivElement;
      const input: HTMLInputElement = numberField.getElementsByTagName('input')[0];
      expect(input.getAttribute('value')).toEqual('0');
    });

    it('OnUpdated callback is called without submitting form', () => {
      const updateCallback: sinon.SinonStub = sinon.stub();
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateCallback}>
          <ExtendsTextBox inputKey="field" value="0" />
        </Form>
      ) as Form;
      const textBox: ExtendsTextBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsTextBox);
      textBox.setValue('1');
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateCallback.calledOnce).toBeTruthy();
    });

    it('Errors are hidden when pristine', () => {
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form>
          <ExtendsTextBox inputKey="field" validators={[Validators.required(formRequiredTestMessage)]} />
        </Form>
      ) as Form;
      // Error message is gated behind <DelayedRender>, tick the clock to make it show up
      clock.tick(DEFAULT_DEBOUNCE);

      const errors: HTMLElement[] = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        renderedForm,
        'ms-TextField-errorMessage'
      ) as HTMLElement[];
      expect(errors.length).toEqual(0);
    });

    it('Errors are shown when pristine and prop is set', () => {
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form showErrorsWhenPristine={true}>
          <ExtendsTextBox inputKey="field" validators={[Validators.required(formRequiredTestMessage)]} />
        </Form>
      ) as Form;
      // Error message is gated behind <DelayedRender>, tick the clock to make it show up
      clock.tick(DEFAULT_DEBOUNCE);

      const errors: HTMLElement[] = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        renderedForm,
        'ms-TextField-errorMessage'
      ) as HTMLElement[];
      expect(errors.length).toEqual(1);
    });

    it('Debounce interval can be changed', () => {
      const updateCallback: sinon.SinonStub = sinon.stub();
      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateCallback}>
          <ExtendsTextBox inputKey="field" value="0" debounceInterval={3000} />
        </Form>
      ) as Form;
      const textBox: ExtendsTextBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsTextBox);
      textBox.setValue('1');
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateCallback.calledOnce).toBeFalsy();
      clock.tick(3000);
      expect(updateCallback.calledOnce).toBeTruthy();
    });
  });
});
