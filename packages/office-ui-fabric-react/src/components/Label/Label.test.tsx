import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { LabelBase } from './Label.base';
import { getStyles } from './Label.styles';

describe('Label', () => {

  it('renders a label', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <LabelBase styles={ getStyles }>test</LabelBase>
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;

    expect(renderedDOM.textContent).toEqual('test');
  });

  it('renders label correctly', () => {
    const component = renderer.create(
      <LabelBase styles={ getStyles }>test</LabelBase>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
