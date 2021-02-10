import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { resetIds } from '../../Utilities';

describe('TeachingBubble', () => {
  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    resetIds();
  });

  it('renders renders with hasCloseIcon which is deprecated', () => {
    const componentContent = renderer.create(
      <TeachingBubbleContent
        headline="Test Title"
        hasCloseIcon={true}
        primaryButtonProps={{ children: 'Test Primary Button', className: 'primary-className' }}
        secondaryButtonProps={{ children: 'Test Secondary Button', className: 'secondary-className' }}
      >
        Content
      </TeachingBubbleContent>,
    );
    const treeContent = componentContent.toJSON();
    expect(treeContent).toMatchSnapshot();
  });
});
