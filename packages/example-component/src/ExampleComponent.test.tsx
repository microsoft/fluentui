/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import * as ReactTestUtils from 'react-addons-test-utils';
import { ExampleComponent } from './ExampleComponent';

describe('ExampleComponent', () => {

  it('Renders without throwing', () => {
    const component: ExampleComponent = ReactTestUtils.renderIntoDocument(
      <ExampleComponent />
    ) as ExampleComponent;
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    const rootElement: HTMLDivElement | null = renderedDOM.querySelector('div');

    expect(rootElement).to.not.be.empty;
  });

});
