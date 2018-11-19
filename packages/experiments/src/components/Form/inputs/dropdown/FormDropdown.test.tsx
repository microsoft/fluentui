/* tslint:disable:no-any jsx-no-lambda no-string-literal */

import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../Form';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormDropdown } from './FormDropdown';

describe('FormDropdown Unit Tests', () => {
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
      const consoleMock = jest.spyOn(console, 'error');
      consoleMock.mockImplementation(() => undefined);

      const errorFunction = () => {
        ReactTestUtils.renderIntoDocument(
          <Form onSubmit={undefined}>
            <FormDropdown inputKey={null as any} value={undefined} />
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
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form onSubmit={undefined}>
          <FormDropdown inputKey="name" value={undefined} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Dropdown') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            result = value;
          }}
        >
          <FormDropdown
            inputKey="name"
            dropdownProps={{
              options: [{ key: 1, text: 'Option 1' }, { key: 0, text: 'Option 2' }, { key: 2, text: 'Option 3' }]
            }}
            value={0}
          />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Dropdown') as HTMLElement;
      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      expect(result['name']).toEqual(0);
    });
  });

  describe('Dropdown update tests', () => {
    class ExtendsDropdown extends FormDropdown {
      public setValue(value: number): void {
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

    it('Dropdown is leading and trailing debounced', () => {
      const updateStub: sinon.SinonStub = sinon.stub();
      const renderedForm = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateStub}>
          <ExtendsDropdown
            inputKey="name"
            value={0}
            dropdownProps={{
              options: [
                {
                  key: 0,
                  text: ''
                },
                {
                  key: 1,
                  text: ''
                }
              ]
            }}
          />
        </Form>
      ) as Form;

      const datePicker: ExtendsDropdown = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsDropdown);
      datePicker.setValue(0);
      expect(updateStub.callCount).toEqual(1);
      datePicker.setValue(1);
      expect(updateStub.callCount).toEqual(1);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(2);
    });
  });
});
