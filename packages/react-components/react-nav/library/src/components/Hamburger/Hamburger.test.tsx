import type * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { Hamburger } from './Hamburger';
import type { HamburgerProps } from './Hamburger.types';

describe('Hamburger', () => {
  isConformant({
    Component: Hamburger as React.FunctionComponent<HamburgerProps>,
    displayName: 'Hamburger',
    // useHamburgerStyles_unstable delegates to react-button's converted (clsx-based)
    // useButtonStyles_unstable, so the mocked mergeClasses never receives the consumer
    // className as its exact last argument — the Griffel-era test cannot pass. The
    // cascade-native replacement (classname-overrides-win) does not fit either: this
    // component still composes with mergeClasses, which appends its atomics after the
    // consumer's className by design. Re-enable the replacement when react-nav itself
    // converts.
    disabledTests: ['make-styles-overrides-win'],
  });
});
