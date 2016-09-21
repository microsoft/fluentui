/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { TeachingBubbleContent } from './index';

describe('TeachingBubble', () => {

  // <Layer> compoents will lead ReactDOM.findDOMNode(component) return null, so the test is based on the actual teaching bubble content.
  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TeachingBubbleContent
        headline='Title'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');

    expect(titleElement.textContent).to.equal('Title');
  });

});
