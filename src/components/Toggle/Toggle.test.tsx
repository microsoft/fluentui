/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import Toggle from './Toggle';

describe('Toggle', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let labelElement = renderedDOM.querySelector('.ms-Toggle-description');

    expect(labelElement.textContent).to.equal('Label');
  });

  it('can call the callback on a click', () => {
    let isToggledValue;
    let callback = (isToggled) => {
      isToggledValue = isToggled;
    };
    let component = ReactTestUtils.renderIntoDocument(
      <Toggle
        label='Label'
        onChanged={ callback }
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.click(renderedDOM);
    expect(isToggledValue).to.equal(true);
  });

});
