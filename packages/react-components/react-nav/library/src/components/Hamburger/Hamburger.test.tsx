import type * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Hamburger } from './Hamburger';
import type { HamburgerProps } from './Hamburger.types';

describe('Hamburger', () => {
  isConformant({
    Component: Hamburger as React.FunctionComponent<HamburgerProps>,
    displayName: 'Hamburger',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `hamburgerClassNames` is now `{ root }`
    // holding the group marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker`
    // (a default test) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // Hamburger IS a react-button Button — `useHamburgerStyles_unstable` calls
      // `useButtonStyles_unstable` on the same state — so the one element carries BOTH
      // markers and the "exactly one" half of `component-has-group-marker` has to be told the
      // whole set (DECISIONS.md D16.3).
      'has-group-marker': { markers: ['group/fui-hamburger', 'group/fui-button'] },
    },
  });
});
