import * as React from 'react';
import { render } from '@testing-library/react';
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
    const { container } = render(
      <TeachingBubbleContent
        headline="Test Title"
        hasCloseIcon={true}
        primaryButtonProps={{ children: 'Test Primary Button', className: 'primary-className' }}
        secondaryButtonProps={{ children: 'Test Secondary Button', className: 'secondary-className' }}
      >
        Content
      </TeachingBubbleContent>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
