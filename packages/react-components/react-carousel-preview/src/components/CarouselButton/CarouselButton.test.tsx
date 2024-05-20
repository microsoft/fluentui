import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselButton } from './CarouselButton';
import { CarouselButtonProps } from './CarouselButton.types';

describe('CarouselButton', () => {
  isConformant({
    Component: CarouselButton as React.FunctionComponent<CarouselButtonProps>,
    displayName: 'CarouselButton',
    requiredProps: {
      navType: 'next',
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselButton navType="next">{'next'}</CarouselButton>);
    expect(result.container).toMatchSnapshot();
  });
});
