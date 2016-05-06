/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import TextField from './TextField';

describe('TextField', () => {

  it('should render the value to input element', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TextField value='test' />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let inputDOM = renderedDOM.getElementsByTagName('input')[0];

    expect(inputDOM.value).to.equal('test');
  });

  it('should render a disabled input element', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TextField disabled />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let inputDOM = renderedDOM.getElementsByTagName('input')[0];

    expect(inputDOM.disabled).to.equal(true);
  });

});
