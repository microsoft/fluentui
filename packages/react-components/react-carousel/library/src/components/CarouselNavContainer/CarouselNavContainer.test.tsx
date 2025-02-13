import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavContainer } from './CarouselNavContainer';
import { carouselNavContainerClassNames } from './useCarouselNavContainerStyles.styles';

describe('CarouselNavContainer', () => {
  isConformant({
    Component: CarouselNavContainer,
    displayName: 'CarouselNavContainer',
    requiredProps: { autoplay: '' },

    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            // Tooltip classNames are not expected as it has no root
            root: carouselNavContainerClassNames.root,
            next: carouselNavContainerClassNames.next,
            prev: carouselNavContainerClassNames.prev,
            autoplay: carouselNavContainerClassNames.autoplay,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavContainer autoplay={''}>Default CarouselNavContainer</CarouselNavContainer>);
    expect(result.container).toMatchSnapshot();
  });
});
