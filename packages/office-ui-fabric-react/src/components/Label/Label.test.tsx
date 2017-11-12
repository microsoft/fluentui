/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { LabelBase } from './Label.base';
import { getStyles } from './Label.styles';

describe('Label', () => {

  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <LabelBase getStyles={ getStyles }>test</LabelBase>
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);

    expect(renderedDOM.textContent).toEqual('test');
  });

  it('renders label correctly', () => {
    const component = renderer.create(
      <LabelBase getStyles={ getStyles }>test</LabelBase>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
