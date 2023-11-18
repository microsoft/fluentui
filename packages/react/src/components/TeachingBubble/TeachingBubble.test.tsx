import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { resetIds } from '../../Utilities';
import { mount } from 'enzyme';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

describe('TeachingBubble', () => {
  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    resetIds();
  });

  it('renders TeachingBubble using a <div> for the child content if the child is not a string', () => {
    const component = mount(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
      >
        <div>Not a string child</div>
      </TeachingBubble>,
    );

    expect(component.find(TeachingBubbleContent).find('div#content').length).toBe(1);
  });

  it('renders TeachingBubble using a <p> for the child content if the child is a string', () => {
    const component = mount(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
      >
        Not a string child
      </TeachingBubble>,
    );

    expect(component.find(TeachingBubbleContent).find('p#content').length).toBe(1);
  });

  it('renders TeachingBubble with provided aria-describedby and aria-labelledby', () => {
    const component = mount(
      <TeachingBubble headline="Test Title" ariaDescribedBy="content" ariaLabelledBy="title">
        Test Content
      </TeachingBubble>,
    );

    expect(component.find('div[aria-describedby="content"]').length).toBe(1);
    expect(component.find('div[aria-labelledby="title"]').length).toBe(1);
    expect(component.find('p[id="content"]').length).toBe(1);
    expect(component.find('p[id="title"]').length).toBe(1);
  });

  it('renders TeachingBubbleContent with generated aria-describedby and aria-labelledby', () => {
    const component = renderer.create(
      <TeachingBubbleContent headline="Test Title">Test Content</TeachingBubbleContent>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders TeachingBubble correctly', () => {
    const component = renderer.create(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Test Content
      </TeachingBubble>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent headline="Test Title" ariaDescribedBy="content" ariaLabelledBy="title">
        Content
      </TeachingBubbleContent>,
    );
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
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with image correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        headline="Test Title"
        illustrationImage={{ src: 'test image url' }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with condensed headline correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        hasCondensedHeadline={true}
        headline="Test Title"
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with small headline correctly', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        hasSmallHeadline={true}
        headline="Test Title"
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with custom footer text', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent footerContent="1 of 2" ariaDescribedBy="content" ariaLabelledBy="title">
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with calloutProps that deal with styles', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        calloutProps={{ beakWidth: 50, calloutWidth: 100 }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });

  isConformant({
    Component: TeachingBubble,
    displayName: 'TeachingBubble',
    componentPath: path.join(__dirname, 'TeachingBubble.ts'),
    // Problem: Ref is applied but not on root element
    // Solution: Ref should be applied to TeachingBubbleContent and the wrapper div should be removed.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('merges callout classNames', () => {
    ReactTestUtils.renderIntoDocument(<TeachingBubbleContent headline="Title" calloutProps={{ className: 'foo' }} />);
    setTimeout(() => {
      const callout = document.querySelector('.ms-Callout') as HTMLElement;
      expect(callout).toBeTruthy();
      expect(callout.classList.contains('ms-TeachingBubble')).toBeTruthy();
      expect(callout.classList.contains('foo')).toBeTruthy();
    }, 0);
  });
});
