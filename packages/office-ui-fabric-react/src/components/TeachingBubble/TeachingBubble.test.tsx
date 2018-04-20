import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';

describe('TeachingBubble', () => {

  it('renders TeachingBubble correctly', () => {
    const component = renderer.create(<TeachingBubble>Content</TeachingBubble>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const componentContent = renderer.create(<TeachingBubbleContent headline='Title'>Content</TeachingBubbleContent>);
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  // <Layer> components will lead ReactDOM.findDOMNode(test_component) return null, so the test is based on the teaching bubble content.
  it('renders a label', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <TeachingBubbleContent
        headline='Title'
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const titleElement = renderedDOM.querySelector('.ms-TeachingBubble-headline');

    expect(titleElement!.textContent).toEqual('Title');
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument<TeachingBubbleContent>(
      <TeachingBubbleContent
        headline='Title'
        calloutProps={ { className: 'foo' } }
      />
    );
    setTimeout(() => {
      const callout = document.querySelector('.ms-Callout') as HTMLElement;
      expect(callout).toBeDefined();
      expect(callout.classList.contains('ms-TeachingBubble')).toBeTruthy();
      expect(callout.classList.contains('foo')).toBeTruthy();
    }, 0);
  });
});
