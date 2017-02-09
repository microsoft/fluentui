/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Label } from './Label';

describe('Label', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Label>test</Label>
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);

    expect(renderedDOM.textContent).to.equal('test');
  });

});
