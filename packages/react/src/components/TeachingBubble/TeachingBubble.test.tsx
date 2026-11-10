import * as React from 'react';
import { TeachingBubble } from './TeachingBubble';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { resetIds } from '../../Utilities';
import { render } from '@testing-library/react';
import { getBySelector } from '../../common/testUtilities';
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
    const { container } = render(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
      >
        <div>Not a string child</div>
      </TeachingBubble>,
    );

    expect(getBySelector(container, 'div#content')).toBeTruthy();
  });

  it('renders TeachingBubble using a <p> for the child content if the child is a string', () => {
    const { container } = render(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
      >
        Not a string child
      </TeachingBubble>,
    );

    expect(getBySelector(container, 'p#content')).toBeTruthy();
  });

  it('renders TeachingBubble with provided aria-describedby and aria-labelledby', () => {
    const { baseElement } = render(
      <TeachingBubble headline="Test Title" ariaDescribedBy="content" ariaLabelledBy="title">
        Test Content
      </TeachingBubble>,
    );

    expect(getBySelector(baseElement, 'div[aria-describedby="content"]')).toBeTruthy();
    expect(getBySelector(baseElement, 'div[aria-labelledby="title"]')).toBeTruthy();
    expect(getBySelector(baseElement, 'p[id="content"]')).toBeTruthy();
    expect(getBySelector(baseElement, 'p[id="title"]')).toBeTruthy();
  });

  it('renders TeachingBubbleContent with generated aria-describedby and aria-labelledby', () => {
    const { container } = render(<TeachingBubbleContent headline="Test Title">Test Content</TeachingBubbleContent>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubble correctly', () => {
    const { container } = render(
      <TeachingBubble
        isWide={true}
        calloutProps={{ doNotLayer: true, className: 'specialClassName' }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Test Content
      </TeachingBubble>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent correctly', () => {
    const { container } = render(
      <TeachingBubbleContent headline="Test Title" ariaDescribedBy="content" ariaLabelledBy="title">
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with buttons correctly', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with image correctly', () => {
    const { container } = render(
      <TeachingBubbleContent
        headline="Test Title"
        illustrationImage={{ src: 'test image url' }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with condensed headline correctly', () => {
    const { container } = render(
      <TeachingBubbleContent
        hasCondensedHeadline={true}
        headline="Test Title"
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with small headline correctly', () => {
    const { container } = render(
      <TeachingBubbleContent
        hasSmallHeadline={true}
        headline="Test Title"
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with custom footer text', () => {
    const { container } = render(
      <TeachingBubbleContent footerContent="1 of 2" ariaDescribedBy="content" ariaLabelledBy="title">
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders TeachingBubbleContent with calloutProps that deal with styles', () => {
    const { container } = render(
      <TeachingBubbleContent
        calloutProps={{ beakWidth: 50, calloutWidth: 100 }}
        ariaDescribedBy="content"
        ariaLabelledBy="title"
      >
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
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
    render(<TeachingBubbleContent headline="Title" calloutProps={{ className: 'foo' }} />);
    setTimeout(() => {
      const callout = document.querySelector('.ms-Callout') as HTMLElement;
      expect(callout).toBeTruthy();
      expect(callout.classList.contains('ms-TeachingBubble')).toBeTruthy();
      expect(callout.classList.contains('foo')).toBeTruthy();
    }, 0);
  });
});
