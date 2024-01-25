import * as React from 'react';
import { render } from '@testing-library/react';
import { TeachingPopoverCarouselNavIcon } from './TeachingPopoverCarouselNavIcon';

describe('TeachingPopoverCarouselNavIcon', () => {
  it('renders a default state', () => {
    const result = render(<TeachingPopoverCarouselNavIcon index={0} />);
    expect(result.container).toMatchSnapshot();
  });
});
