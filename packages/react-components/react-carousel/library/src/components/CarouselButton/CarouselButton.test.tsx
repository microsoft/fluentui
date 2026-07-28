import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselButton } from './CarouselButton';
import type { CarouselButtonProps } from './CarouselButton.types';

describe('CarouselButton', () => {
  isConformant({
    Component: CarouselButton as React.FunctionComponent<CarouselButtonProps>,
    displayName: 'CarouselButton',
    // useCarouselButtonStyles_unstable delegates to react-button's converted (clsx-based)
    // useButtonStyles_unstable, so the mocked mergeClasses never receives the consumer
    // className as its exact last argument — the Griffel-era test cannot pass. The
    // cascade-native replacement (classname-overrides-win) does not fit either: this
    // component still composes with mergeClasses, which appends its atomics after the
    // consumer's className by design. Re-enable the replacement when react-carousel
    // itself converts.
    disabledTests: ['make-styles-overrides-win'],
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
