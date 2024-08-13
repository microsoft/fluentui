import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';

describe('CarouselAutoplayButton', () => {
  isConformant({
    Component: CarouselAutoplayButton as React.FunctionComponent<CarouselAutoplayButtonProps>,
    displayName: 'CarouselAutoplayButton',
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
    const result = render(<CarouselAutoplayButton />);
    expect(result.container).toMatchSnapshot();
  });
});
