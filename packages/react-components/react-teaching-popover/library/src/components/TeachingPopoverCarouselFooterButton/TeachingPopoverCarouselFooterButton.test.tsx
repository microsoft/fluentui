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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses; this hook now
    // composes with clsx and delegates to react-button's converted
    // `useButtonStyles_unstable`, so mergeClasses is never called at all.
    // `classname-overrides-win` — enabled below, and NOT enableable before this conversion —
    // is its cascade-native replacement (DECISIONS.md D9): the consumer className rides at
    // the end of this hook's clsx string, and `useButtonStyles_unstable` (called last)
    // prepends its own classes, so the consumer's class stays last in the rendered attribute.
    //
    // `component-has-static-classnames-object` is disabled because the BEM statics are gone
    // (D16.1).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
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
