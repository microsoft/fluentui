import * as React from 'react';
import { render } from '@testing-library/react';
import { TeachingPopoverCarouselNavButton } from './TeachingPopoverCarouselNavButton';

describe('TeachingPopoverCarouselNavButton', () => {
  it('renders a default state', () => {
    const result = render(<TeachingPopoverCarouselNavButton />);
    expect(result.container).toMatchSnapshot();
  });
});
