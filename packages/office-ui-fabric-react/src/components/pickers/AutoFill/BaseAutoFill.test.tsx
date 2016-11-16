/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { BaseAutoFill } from './BaseAutoFill';
import { KeyCodes } from '../../../utilities/KeyCodes';

let { assert } = chai;
describe('BaseAutoFill', () => {
  let autoFill: BaseAutoFill;
  let autoFillInput: HTMLInputElement;
  let baseNode = document.createElement('div');
  document.body.appendChild(baseNode);
  beforeEach(() => {

    let component = ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c }
        suggestedDisplayValue='hello' />,
      baseNode
    );
    autoFillInput = ReactDOM.findDOMNode(component as React.ReactInstance) as HTMLInputElement;
  });

  it('Input Text Works', (done) => {
    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c }
        onInputValueChange={
          (text) => {
            assert(text === 'hel', 'text was ' + text);
            assert(autoFill.value === 'hel', 'autoFill value was ' + autoFill.value);
            assert(autoFill.inputElement.value === 'hello');
            done();
          }
        }
        suggestedDisplayValue='hello' />,
      baseNode
    );
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);
  });

  it('Delete Text Works', (done) => {
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.change(autoFillInput);
    ReactDOM.render(
      <BaseAutoFill
        ref={ (c) => autoFill = c }
        onInputValueChange={
          (text) => {
            assert(autoFill.value === 'he', 'text was ' + autoFill.value);
            assert(text === 'he', 'text was ' + text);
            assert(autoFill.inputElement.value === 'hello');
            done();
          }
        }
        suggestedDisplayValue='hello' />,
      baseNode
    );
    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.backspace, which: KeyCodes.backspace });
  });
});
