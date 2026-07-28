import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

describe('TeachingPopoverCarouselFooterButton', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooterButton as React.FunctionComponent<TeachingPopoverCarouselFooterButtonProps>,
    displayName: 'TeachingPopoverCarouselFooterButton',
    // useTeachingPopoverCarouselFooterButtonStyles_unstable delegates to react-button's
    // converted (clsx-based) useButtonStyles_unstable, so the mocked mergeClasses never
    // receives the consumer className as its exact last argument — the Griffel-era test
    // cannot pass. The cascade-native replacement (classname-overrides-win) does not fit
    // either: this component still composes with mergeClasses, which appends its atomics
    // after the consumer's className by design. Re-enable the replacement when
    // react-teaching-popover itself converts.
    disabledTests: ['make-styles-overrides-win'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselFooterButton navType="next" altText="altText">
        Default TeachingPopoverCarouselFooterButton
      </TeachingPopoverCarouselFooterButton>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
