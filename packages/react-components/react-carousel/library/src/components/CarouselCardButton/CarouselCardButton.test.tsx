import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselCardButton } from './CarouselCardButton';

describe('CarouselCardButton', () => {
  isConformant({
    Component: CarouselCardButton,
    displayName: 'CarouselCardButton',
  });

  it('renders a default state', () => {
    const result = render(<CarouselCardButton>Default CarouselCardButton</CarouselCardButton>);
    expect(result.container).toMatchSnapshot();
  });
});
