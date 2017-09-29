/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { KeyCodes } from '../../../Utilities';
import { BaseAutoFill } from './BaseAutoFill';

let { assert } = chai;
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
      assert(text === 'hel', 'text was ' + text);
      assert(autoFill.value === 'hel', 'autoFill value was ' + autoFill.value);
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
    assert(autoFill.inputElement.value === 'hello');

  });

  it('does not autofill if suggestedDisplayValue does not match input', (done) => {
    const onInputValueChange = (text: string | undefined): void => {
      assert(autoFill.value === 'hep', 'text was ' + autoFill.value);
      assert(text === 'hep', 'text was ' + text);
      assert(autoFill.inputElement.value === 'hep');
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

    assert(autoFill.value === 'hel', 'text was ' + autoFill.value);
    assert(autoFill.inputElement.value === 'hel');
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

    assert(autoFill.value === 'hel', 'text was ' + autoFill.value);
    assert(autoFill.inputElement.value === 'hel');

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

    assert(autoFill.value === 'hel');
    assert(autoFill.inputElement.value === 'hello');
  });
});
