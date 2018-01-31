/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';

describe('TeachingBubble', () => {

  it('renders TeachingBubble correctly', () => {
    const component = renderer.create(<TeachingBubble>Content</TeachingBubble>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const componentContent = renderer.create(<TeachingBubbleContent headline='Title'>Content</TeachingBubbleContent>);
    let treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
  it('renders a label', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <TeachingBubbleContent
        headline='Title'
      />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');

    expect(titleElement!.textContent).toEqual('Title');
  });

});
