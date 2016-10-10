/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { TooltipContent } from './index';

describe('Tooltip', () => {

  // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TooltipContent>
        Foo
      </TooltipContent>
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let contentElement = renderedDOM.querySelector('.ms-Tooltip-subText');

    expect(contentElement.textContent).to.equal('Foo');
  });

});
