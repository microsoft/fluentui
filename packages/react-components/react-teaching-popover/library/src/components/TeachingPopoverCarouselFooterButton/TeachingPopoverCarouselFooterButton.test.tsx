import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

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

describe('TeachingPopoverCarouselFooterButton DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <TeachingPopoverCarouselFooterButton
        navType="next"
        altText="Finish"
        appearance="primary"
        disabledFocusable={false}
        icon={<span />}
        iconPosition="after"
        shape="circular"
        size="large"
      >
        Next
      </TeachingPopoverCarouselFooterButton>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
