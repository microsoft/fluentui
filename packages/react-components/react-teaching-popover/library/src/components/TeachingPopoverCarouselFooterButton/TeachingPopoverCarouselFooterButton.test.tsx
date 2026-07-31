import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

describe('TeachingPopoverCarouselFooterButton', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooterButton as React.FunctionComponent<TeachingPopoverCarouselFooterButtonProps>,
    displayName: 'TeachingPopoverCarouselFooterButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because the BEM statics are gone
    // (D16.1).
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // A TeachingPopoverCarouselFooterButton IS a react-button `Button` —
      // `useButtonStyles_unstable` stamps its marker on this same element — so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-teaching-popover-carousel-footer-button'],
      },
    },
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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
