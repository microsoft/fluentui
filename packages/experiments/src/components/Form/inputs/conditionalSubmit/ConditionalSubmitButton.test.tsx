import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as sinon from 'sinon';

import { Form } from '../../Form';
import { DEFAULT_DEBOUNCE } from '../../FormBaseInput';
import { FormConditionalSubmitButton } from './FormConditionalSubmitButton';
import { FormTextInput } from '../textInput/FormTextInput';
import { Validators } from '../../validators/Validators';

describe('FormSubmitButton Unit Tests', () => {
  class ExtendsTextBox extends FormTextInput {
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

  it('Button is disabled when form is invalid and enabled when form is valid', () => {
    const renderedForm = ReactTestUtils.renderIntoDocument(
      <Form>
        <ExtendsTextBox inputKey="name" validators={[Validators.required('Error')]} />

        <FormConditionalSubmitButton />
      </Form>
    ) as Form;

    const button: HTMLButtonElement = ReactTestUtils.findRenderedDOMComponentWithClass(renderedForm, 'ms-Button') as HTMLButtonElement;
    const textBox: ExtendsTextBox = ReactTestUtils.findRenderedComponentWithType(renderedForm, ExtendsTextBox);

    expect(button.getAttribute('disabled')).toEqual('');
    textBox.setValue('Value');
    clock.tick(DEFAULT_DEBOUNCE);
    expect(button.getAttribute('disabled')).toBeFalsy();
  });
});
