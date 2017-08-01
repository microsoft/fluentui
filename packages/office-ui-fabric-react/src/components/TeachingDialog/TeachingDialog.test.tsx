/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { TeachingDialogContent } from './TeachingDialogContent';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';

let { expect } = chai;

describe('TeachingDialog', () => {

  // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TeachingDialogContent
        title='Title'
        image=''
        textContent='Lorem ipsum'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let titleElement = renderedDOM.querySelector('.ms-TeachingDialog-content-tile');

    expect(titleElement.textContent).to.equal('Title');
  });
});
