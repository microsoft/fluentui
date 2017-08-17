/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Link } from './Link';

describe('Link', () => {

  it('renders a link', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Link href='#'>test</Link >
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);

    expect(renderedDOM.textContent).to.equal('test');
  });

});
