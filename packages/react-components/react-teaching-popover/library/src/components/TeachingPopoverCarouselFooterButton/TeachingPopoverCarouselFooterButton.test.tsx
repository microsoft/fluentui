import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';
import { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

describe('TeachingPopoverCarouselFooterButton', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooterButton as React.FunctionComponent<TeachingPopoverCarouselFooterButtonProps>,
    displayName: 'TeachingPopoverCarouselFooterButton',
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
