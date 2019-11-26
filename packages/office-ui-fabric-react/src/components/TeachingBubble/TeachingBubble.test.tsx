import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { mount } from 'enzyme';

describe('TeachingBubble', () => {
  it('renders TeachingBubble using a <div> for the child content if the child is not a string', () => {
    const component = mount(
      <TeachingBubble isWide={true} calloutProps={{ doNotLayer: true, className: 'specialClassName' }} ariaDescribedBy="content">
        <div>Not a string child</div>
      </TeachingBubble>
    );

    expect(component.find(TeachingBubbleContent).find('div#content').length).toBe(1);
  });

  it('renders TeachingBubble using a <p> for the child content if the child is a string', () => {
    const component = mount(
      <TeachingBubble isWide={true} calloutProps={{ doNotLayer: true, className: 'specialClassName' }} ariaDescribedBy="content">
        Not a string child
      </TeachingBubble>
    );

    expect(component.find(TeachingBubbleContent).find('p#content').length).toBe(1);
  });

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
    const componentContent = renderer.create(<TeachingBubbleContent headline="Test Title">Content</TeachingBubbleContent>);
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with buttons correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        headline="Test Title"
        hasCloseButton={true}
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

  it('renders TeachingBubbleContent with custom footer text', () => {
    const componentContent = renderer.create(<TeachingBubbleContent footerContent="1 of 2">Content</TeachingBubbleContent>);
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
