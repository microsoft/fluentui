/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { KeyCodes } from '../../../Utilities';
import { BaseAutoFill } from './BaseAutoFill';

describe('BaseAutoFill', () => {
  let autoFill: BaseAutoFill;
  let autoFillInput: HTMLInputElement;
  let baseNode = document.createElement('div');
  document.body.appendChild(baseNode);
  beforeEach(() => {

    let component = ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );
    autoFillInput = ReactDOM.findDOMNode(component as React.ReactInstance) as HTMLInputElement;
  });

  it('correctly autofills', (done) => {
    const onInputValueChange = (text: string | undefined): void => {
      expect(text).toBe('hel');
      expect(autoFill.value).toBe('hel');
      done();
    };

    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        onInputValueChange={ onInputValueChange }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);
    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        onInputValueChange={ onInputValueChange }
        suggestedDisplayValue='hello'
      />, baseNode);
    expect(autoFill.inputElement.value).toBe('hello');

  });

  it('does not autofill if suggestedDisplayValue does not match input', (done) => {
    const onInputValueChange = (text: string | undefined): void => {
      expect(text).toBe('hep');
      expect(autoFill.value).toBe('hep');
      expect(autoFill.inputElement.value).toBe('hep');
      done();
    };

    autoFillInput.value = 'hep';
    ReactTestUtils.Simulate.change(autoFillInput);
    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        onInputValueChange={ onInputValueChange }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );
    ReactTestUtils.Simulate.change(autoFillInput);
  });

  it('does not autofill if left or right arrow has been pressed', () => {
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);

    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.left, which: KeyCodes.left });

    // Because reacttestutils doesn't allow you to enter text normally we need to reset the autofillinput value to hel.
    // If we don't the change event will cause the current input value, 'hello', to be set.
    autoFillInput.value = 'hel';

    ReactTestUtils.Simulate.change(autoFillInput);

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement.value).toBe('hel');
  });

  it('will autofill if keyCode up or down is pressed', () => {
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);

    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement.value).toBe('hel');

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.left, which: KeyCodes.left });

    autoFillInput.value = 'hel';

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.up, which: KeyCodes.up });
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);

    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c! }
        suggestedDisplayValue='hello'
      />,
      baseNode
    );

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement.value).toBe('hello');
  });
});
