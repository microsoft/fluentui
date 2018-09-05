/* tslint:disable:no-any jsx-no-lambda no-string-literal */

import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../Form';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormTagPicker } from './FormTagPicker';
import { ITag } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';

describe('FormTagPicker Unit Tests', () => {
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
            <FormTagPicker
              inputKey={null as any}
              value={undefined}
              tagPickerProps={{ onResolveSuggestions: () => [] }}
            />
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
          <FormTagPicker inputKey="tag" value={undefined} tagPickerProps={{ onResolveSuggestions: () => [] }} />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-BasePicker') as HTMLElement;
    });

    it('With initial value', () => {
      let result: any;

      const option1: ITag = { key: '1', name: 'Tag 1' };
      const option2: ITag = { key: '2', name: 'Tag 2' };

      renderedForm = ReactTestUtils.renderIntoDocument(
        <Form
          onSubmit={(value: any) => {
            result = value;
          }}
        >
          <FormTagPicker
            inputKey="tag"
            tagPickerProps={{ onResolveSuggestions: () => [option1, option2] }}
            value={[option2]}
          />
        </Form>
      ) as Form;

      renderedInput = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-BasePicker') as HTMLElement;
      const form: HTMLFormElement = ReactTestUtils.findRenderedDOMComponentWithTag(
        renderedForm,
        'form'
      ) as HTMLFormElement;
      ReactTestUtils.Simulate.submit(form);

      expect(result['tag']).toEqual([option2]);
    });
  });

  describe('TagPicker update tests', () => {
    class ExtendsTagPicker extends FormTagPicker {
      public setValue(value: Array<ITag>): void {
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

    it('TagPicker is leading and trailing debounced', () => {
      const option1: ITag = { key: '1', name: 'Tag 1' };
      const option2: ITag = { key: '2', name: 'Tag 2' };

      const updateStub: sinon.SinonStub = sinon.stub();
      const renderedForm = ReactTestUtils.renderIntoDocument(
        <Form onUpdated={updateStub}>
          <ExtendsTagPicker
            inputKey="tag"
            value={[option1]}
            tagPickerProps={{ onResolveSuggestions: () => [option1, option2] }}
          />
        </Form>
      ) as Form;

      const datePicker: ExtendsTagPicker = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsTagPicker);
      datePicker.setValue([option2]);
      expect(updateStub.callCount).toEqual(1);
      datePicker.setValue([option1, option2]);
      expect(updateStub.callCount).toEqual(1);
      clock.tick(DEFAULT_DEBOUNCE);
      expect(updateStub.callCount).toEqual(2);
    });
  });
});
