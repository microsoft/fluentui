import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';

describe('TeachingBubble', () => {
  it('renders TeachingBubble correctly', () => {
    const component = renderer.create(
      <TeachingBubble isWide={true} calloutProps={{ doNotLayer: true, className: 'specialClassName' }}>
        Test Content
      </TeachingBubble>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent headline="Test Title">Content</TeachingBubbleContent>
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with buttons correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        headline="Test Title"
        hasCloseIcon={true}
        primaryButtonProps={{ children: 'Test Primary Button', className: 'primary-className' }}
        secondaryButtonProps={{ children: 'Test Secondary Button', className: 'secondary-className' }}
      >
        Content
      </TeachingBubbleContent>
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with image correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent headline="Test Title" illustrationImage={{ src: 'test image url' }}>
        Content
      </TeachingBubbleContent>
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with condensed headline correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent hasCondensedHeadline={true} headline="Test Title">
        Content
      </TeachingBubbleContent>
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with small headline correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent hasSmallHeadline={true} headline="Test Title">
        Content
      </TeachingBubbleContent>
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument(<TeachingBubbleContent headline="Title" calloutProps={{ className: 'foo' }} />);
    setTimeout(() => {
      const callout = document.querySelector('.ms-Callout') as HTMLElement;
      expect(callout).toBeDefined();
      expect(callout.classList.contains('ms-TeachingBubble')).toBeTruthy();
      expect(callout.classList.contains('foo')).toBeTruthy();
    }, 0);
  });
});
