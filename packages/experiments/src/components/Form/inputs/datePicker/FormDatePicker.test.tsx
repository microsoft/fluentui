/* tslint:disable:no-any jsx-no-lambda no-string-literal */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../Form';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormDatePicker } from './FormDatePicker';

describe('FormDatePicker Unit Tests', () => {
  describe('Renders for all combinations of props', () => {
    let renderedForm: Form;
    let renderedInput: HTMLElement;

    beforeEach(() => {
      (renderedForm as any) = undefined;
      (renderedForm as any) = undefined;
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
            <FormDatePicker inputKey={null as any} value={undefined} />
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
          <FormDatePicker inputKey="name" value={undefined} validators={undefined} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;
      const now: Date = new Date();
      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            result = value;
          }}
        >
          <FormDatePicker inputKey="name" value={now} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-DatePicker') as HTMLElement;
      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(renderedForm, 'form') as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      expect(result['name']).toEqual(now);
    });
  });
  describe('DatePicker update tests', () => {
    class ExtendsDatePicker extends FormDatePicker {
      public setValue(value: Date): void {
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

    it('DatePicker is leading and trailing debounced', () => {
      const updateStub: sinon.SinonStub = sinon.stub();
      const renderedForm = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateStub}>
          <ExtendsDatePicker inputKey="name" value={new Date()} />
        </Form>
      ) as Form;

      const datePicker: ExtendsDatePicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsDatePicker);
      datePicker.setValue(new Date('2015-05-05'));
      expect(updateStub.callCount).toEqual(1);
      datePicker.setValue(new Date('2014-05-05'));
      expect(updateStub.callCount).toEqual(1);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(2);
    });
  });
});
