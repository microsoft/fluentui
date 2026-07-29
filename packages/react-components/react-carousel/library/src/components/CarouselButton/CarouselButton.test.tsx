import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { CarouselButton } from './CarouselButton';
import type { CarouselButtonProps } from './CarouselButton.types';

describe('CarouselButton', () => {
  isConformant({
    Component: CarouselButton as React.FunctionComponent<CarouselButtonProps>,
    displayName: 'CarouselButton',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // Neither this component's styles hook nor @fluentui/react-button's Button (also
    // converted) calls mergeClasses any more, so `make-styles-overrides-win` has nothing to
    // observe. `classname-overrides-win` is its cascade-native replacement, and it now
    // passes: this hook composes with clsx and keeps `state.root.className` — which already
    // ends with the consumer's, appended last by Button's own clsx — at the end of the
    // rendered class attribute (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` and its `has-static-classnames` testOptions
    // are gone with the BEM statics: `carouselButtonClassNames.root` is now the group marker
    // and the never-applied `icon` key was removed (DECISIONS.md D16.1/D16.5/D16.6).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    requiredProps: {
      navType: 'next',
    },
    testOptions: {
      // renders react-button's Button, whose hook stamps its marker on this same element, so
      // this root legitimately carries every marker below (DECISIONS.md D16.3). Declaring the
      // whole set keeps `component-has-group-marker` running: it is an exact set comparison,
      // so an undeclared marker still fails, and its `classList[0]` half — the D16.2
      // invariant that nwsapi's jsdom `:scope` polyfill depends on — is asserted here.
      //
      // `classList[0]` is this hook's own unconditional `styles.root`: it leads its clsx and
      // `useButtonStyles_unstable` has already run, so Button's classes (and the consumer's)
      // follow it. No prop combination can expose a marker at index 0.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-carousel-button'],
      },
    },
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselButton navType="next">{'next'}</CarouselButton>);
    expect(result.container).toMatchSnapshot();
  });
});
