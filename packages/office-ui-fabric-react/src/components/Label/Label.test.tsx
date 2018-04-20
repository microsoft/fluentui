import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { Label } from './index';

describe('Label', () => {

  it('renders a label', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Label>test</Label>
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;

    expect(renderedDOM.textContent).toEqual('test');
  });

  it('renders label correctly', () => {
    const component = renderer.create(
      <Label>test</Label>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
