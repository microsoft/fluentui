/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../Form';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormCheckBox } from './FormCheckBox';

describe('FormCheckBox Unit Tests', () => {
  let sandbox: sinon.SinonSandbox;

  beforeAll(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Renders for all combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedInput as any) = undefined;
    });

    afterEach(() => {
      expect(renderedForm).toBeTruthy();
      expect(renderedInput).toBeTruthy();
    });

    it('Null name throws error', () => {
      let errorFunction = () => {
        ReactTestUtils.renderIntoDocument(
          <Form
            onSubmit={ undefined }
          >
            <FormCheckBox
              inputKey={ null as any }
              value={ undefined }
            />
          </Form>
        );
      };

      expect(errorFunction).toThrow();

      (renderedForm as any) = {};
      (renderedInput as any) = {};
    });

    it('Null props still render', () => {
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={ undefined }
        >
          <FormCheckBox
            inputKey='name'
            value={ undefined }
            validators={ undefined }
          />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={ (value: any) => { result = value; } }
        >
          <FormCheckBox
            inputKey='name'
            value={ true }
          />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Checkbox') as HTMLElement;
      let form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      expect(result['name']).toBeTruthy();
    });
  });

  describe('Checkbox update tests', () => {
    class ExtendsCheckbox extends FormCheckBox {
      public setValue(value: boolean): void {
        super.setValue(value);
      }
    }

    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sandbox.useFakeTimers(Date.now());
    });

    it('Checkbox is leading and trailing debounced', () => {
      let updateStub: sinon.SinonStub = sandbox.stub();
      let renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onUpdated={ updateStub }
        >
          <ExtendsCheckbox
            inputKey='name'
            value={ true }
          />
        </Form>
      ) as Form;

      let checkBox: ExtendsCheckbox = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsCheckbox);
      checkBox.setValue(true);
      expect(updateStub.callCount).toEqual(1);
      checkBox.setValue(false);
      expect(updateStub.callCount).toEqual(1);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(2);
    });
  });
});