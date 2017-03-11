/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import * as ReactTestUtils from 'react-addons-test-utils';
import { ExampleComponent } from './ExampleComponent';

describe('ExampleComponent', () => {
  it('Does stuff', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ExampleComponent />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let labelElement = renderedDOM.querySelector('div');
  });

  it('Does more things', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ExampleComponent />
    );

    expect(component).is.null;
  });
});
