/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { TeachingBubbleContent } from './index';

describe('TeachingBubble', () => {

  // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TeachingBubbleContent
        headline='Title'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');

    expect(titleElement.textContent).to.equal('Title');
  });

});
