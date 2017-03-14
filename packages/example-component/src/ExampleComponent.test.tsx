/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import * as ReactTestUtils from 'react-addons-test-utils';
import { ExampleComponent } from './ExampleComponent';

describe('ExampleComponent', () => {

  it('Renders without throwing', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ExampleComponent />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('div');

    expect(labelElement).to.not.be.empty;
  });

});
