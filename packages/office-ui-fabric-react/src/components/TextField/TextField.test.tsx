import 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

import { TextField } from './TextField';

const expect: Chai.ExpectStatic = chai.expect;

describe('TextField', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  function mockEvent(targetValue: string = ''): React.SyntheticEvent<HTMLElement> {
    const target: EventTarget = { value: targetValue } as HTMLInputElement;
    const event: React.SyntheticEvent<HTMLElement> = { target } as React.SyntheticEvent<HTMLElement>;
    return event;
  }

  function delay(millisecond: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, millisecond));
  }

  it('should render label and value to input element', () => {
    const exampleLabel: string = 'this is label';
    const exampleValue: string = 'this is value';

    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        label={ exampleLabel }
        value={ exampleValue }
      />
    );

    // Assert on the input element.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    expect(inputDOM.value).to.equal(exampleValue);
    expect(inputDOM.getAttribute('label')).to.equal(exampleLabel);

    // Assert on the label element.
    const labelDOM: HTMLLabelElement = renderedDOM.getElementsByTagName('label')[0];
    expect(labelDOM.textContent).to.equal(exampleLabel);
  });

  it('should render multiline as text area element', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField value='This\nIs\nMultiline\nText\n' multiline />
    );

    // Assert on the input element.
    const inputDOM: HTMLTextAreaElement = renderedDOM.getElementsByTagName('textarea')[0];
    expect(inputDOM.value).not.be.be.empty;
  });

  it('should associate the label and input box', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField
        label='text-field-label'
        value='whatever value'
      />
    );

    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    const labelDOM: HTMLLabelElement = renderedDOM.getElementsByTagName('label')[0];

    // Assert the input ID and label FOR attribute are the same.
    expect(inputDOM.id).to.not.be.empty;
    expect(inputDOM.id).to.equal(labelDOM.htmlFor);
  });

  it('should render a disabled input element', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(
      <TextField disabled={ true } />
    );

    // Assert the input box is disabled.
    const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
    expect(inputDOM.disabled).to.equal(true);
  });

  describe('error message', () => {
    const errorMessage: string = 'The string is too long, should not exceed 3 characters.';

    function assertErrorMessage(renderedDOM: HTMLElement, expectedErrorMessage: string | boolean): void {
      const errorMessageDOM: HTMLElement =
        renderedDOM.querySelector('[data-automation-id=error-message]') as HTMLElement;

      if (expectedErrorMessage === false) {
        expect(errorMessageDOM).to.be.null; // element not exists
      } else {
        expect(errorMessageDOM.textContent).to.equal(expectedErrorMessage);
      }
    }

    it('should render error message when onGetErrorMessage returns a string', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ validator }
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(250).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should render error message when onGetErrorMessage returns a Promise<string>', () => {
      function validator(value: string): Promise<string> {
        return Promise.resolve(value.length > 3 ? errorMessage : '');
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ validator }
        />
      );

      const inputDOM: HTMLInputElement = renderedDOM.getElementsByTagName('input')[0];
      ReactTestUtils.Simulate.change(inputDOM, mockEvent('the input value'));

      // The value is delayed to validate, so it must to query error message after a while.
      return delay(250).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should render error message on first render when onGetErrorMessage returns a string', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ () => errorMessage }
        />
      );

      assertErrorMessage(renderedDOM, errorMessage);
    });

    it('should render error message on first render when onGetErrorMessage returns a Promise<string>', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ () => Promise.resolve(errorMessage) }
        />
      );

      // The Promise based validation need to assert with async pattern.
      return delay(1).then(() => assertErrorMessage(renderedDOM, errorMessage));
    });

    it('should not render error message when onGetErrorMessage return an empty string', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          value='whatever value'
          onGetErrorMessage={ () => '' }
        />
      );

      assertErrorMessage(renderedDOM, /* exist */ false);
    });

    it('should not render error message when no value is provided', () => {
      let actualValue: string = undefined;

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          label='text-field-label'
          onGetErrorMessage={ (value: string) => actualValue = value }
        />
      );

      assertErrorMessage(renderedDOM, /* exist */ false);
      expect(actualValue).to.equal('');
    });

    it('should update error message when receive new value from props', () => {
      function validator(value: string): string {
        return value.length > 3 ? errorMessage : '';
      }

      const renderedDOM: HTMLElement = renderIntoDocument(
        <TextField
          value='initial value'
          onGetErrorMessage={ validator }
        />
      );

      assertErrorMessage(renderedDOM, errorMessage);

      ReactDOM.render(
        <TextField
          value=''
          onGetErrorMessage={ validator }
        />,
        renderedDOM.parentElement
      );

      return delay(250).then(() => assertErrorMessage(renderedDOM, /* exist */ false));
    });
  });
});
