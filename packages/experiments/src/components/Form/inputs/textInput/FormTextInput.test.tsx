/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

// Controls
import { Form } from '../../Form';
import { IFormProps } from '../../Form.types';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormTextInput } from './FormTextInput';
import { IFormTextInputProps } from './FormTextInput.types';

// Utilities
import { Validators } from '../../validators/Validators';

describe('FormTextInput Unit Tests', () => {
  describe('Renders for all combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLElement;
    let formProps: IFormProps;
    let formTextInputProps: IFormTextInputProps;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
      formProps = {
        onSubmit: undefined
      };
      formTextInputProps = {
        inputKey: null as any,
        value: undefined
      };
    });

    afterEach(() => {
      expect(renderedForm).toBeTruthy();
      expect(renderedInput).toBeTruthy();
    });

    it('Null name throws error', () => {
      const consoleMock = jest.spyOn(console, 'error');
      consoleMock.mockImplementation(() => undefined);

      const errorFunction = () => {
        ReactTestUtils.renderIntoDocument(
          <Form {...formProps}>
            <FormTextInput {...formTextInputProps} />
          </Form>
        );
      };

      expect(errorFunction).toThrow();
      expect(console.error).toHaveBeenCalledTimes(2);
      expect((consoleMock as jest.MockInstance<{}>).mock.calls[0][0]).toMatch(
        'Uncaught [Error: FormBaseInput: name must defined on all form inputs]'
      );

      consoleMock.mockRestore();

      (renderedForm as any) = {};
      (renderedInput as any) = {};
    });

    it('Null props still render', () => {
      formTextInputProps.inputKey = 'name';
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form {...formProps}>
          <FormTextInput {...formTextInputProps} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-TextField') as HTMLElement;
    });

    it('With initial value', () => {
      formTextInputProps.inputKey = 'name';
      formTextInputProps.value = 'Value';
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form {...formProps}>
          <FormTextInput {...formTextInputProps} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-TextField') as HTMLElement;
    });
  });

  describe('Common validations', () => {
    xit('Validators run properly', () => {
      let result: any;

      const renderedForm: Form = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            result = value;
          }}
        >
          <FormTextInput inputKey="field" value="" validators={[Validators.required('Message')]} />
        </Form>
      ) as Form;

      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      // Find the TextField component
      // TODO: this test is not working as intended as even nonsense state names pass.
      //        commented out for now since test isn't executing when named 'xit'
      // const field = ReactTestUtils.findRenderedComponentWithType(renderedForm, TextField);
      // expect(field.state.errorMessage).toBeTruthy();
      expect(result).toBeFalsy();
    });
  });

  describe('Textbox update tests', () => {
    class ExtendsTextInput extends FormTextInput {
      public setValue(value: string): void {
        super.setValue(value);
      }
    }

    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());
    });

    afterEach(() => {
      clock.restore();
    });

    it('TextInput is only trailing debounced', () => {
      const updateStub: sinon.SinonStub = sinon.stub();
      const renderedForm = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateStub}>
          <ExtendsTextInput inputKey="name" value={''} />
        </Form>
      ) as Form;

      const datePicker: ExtendsTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsTextInput);
      datePicker.setValue('0');
      expect(updateStub.callCount).toEqual(0);
      datePicker.setValue('1');
      expect(updateStub.callCount).toEqual(0);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(1);
    });

    it('TextInput state updates from props value change', () => {
      const updatedValue = 'updated';
      const parent = document.createElement('div');
      let renderedForm = ReactDom.render(
        <Form>
          <FormTextInput inputKey="name" key="key" value={'old value'} />
        </Form>,
        parent
      ) as Form;
      const textboxElement: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
      const propsUpdateSpy = sinon.spy(textboxElement, 'componentWillReceiveProps');
      renderedForm = ReactDom.render(
        <Form>
          <FormTextInput inputKey="name" key="key" value={updatedValue} />
        </Form>,
        parent
      ) as Form;

      expect(textboxElement.state.currentValue).toEqual(updatedValue);
      expect(propsUpdateSpy.callCount).toEqual(1);
    });

    it(`TextInput state doesn't update with no new props value`, () => {
      const oldValue = 'old value';
      const parent = document.createElement('div');
      let renderedForm = ReactDom.render(
        <Form>
          <FormTextInput inputKey="name" key="key" value={oldValue} />
        </Form>,
        parent
      ) as Form;
      const textboxElement: FormTextInput = ReactTestUtils.findRenderedComponentWithType(renderedForm, FormTextInput);
      const setStateSpy = sinon.spy(textboxElement, 'setState');
      renderedForm = ReactDom.render(
        <Form>
          <FormTextInput inputKey="name" key="key" value={oldValue} />
        </Form>,
        parent
      ) as Form;

      expect(setStateSpy.callCount).toEqual(0);
    });
  });
});
