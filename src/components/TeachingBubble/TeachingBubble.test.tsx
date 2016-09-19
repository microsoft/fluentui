/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { TeachingBubble } from './TeachingBubble';

describe('TeachingBubble', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TeachingBubble
        headline='Title'

      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component);
    let titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');

    expect(titleElement.textContent).to.equal('Title');
  });

});
