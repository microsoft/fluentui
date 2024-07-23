import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavImageButton } from './CarouselNavImageButton';
import { CarouselNavImageButtonProps } from './CarouselNavImageButton.types';

describe('CarouselNavImageButton', () => {
  isConformant({
    Component: CarouselNavImageButton as React.FunctionComponent<CarouselNavImageButtonProps>,
    displayName: 'CarouselNavImageButton',
    requiredProps: {
      image: {
        src: 'test',
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavImageButton image={{ src: 'test' }} />);
    expect(result.container).toMatchSnapshot();
  });
});
