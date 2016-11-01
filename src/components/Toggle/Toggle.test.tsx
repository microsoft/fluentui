/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Toggle } from './Toggle';

describe('Toggle', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('.ms-Toggle-label');

    expect(labelElement.textContent).to.equal('Label');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    let callback = (isToggled) => {
      isToggledValue = isToggled;
    };
    let component = ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Toggle
        label='Label'
        onChanged={ callback }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let button = renderedDOM.querySelector('.ms-Toggle-button');

    ReactTestUtils.Simulate.click(button);
    expect(isToggledValue).to.equal(true);
    expect((component as React.Component<any, any>).state.isChecked).to.equal(true);
  });

  it(`doesn't update the state if the user provides checked`, () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
        checked={ false }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let button = renderedDOM.querySelector('.ms-Toggle-button');

    ReactTestUtils.Simulate.click(button);

    expect((component as React.Component<any, any>).state.isChecked).to.equal(false);
  });

});
