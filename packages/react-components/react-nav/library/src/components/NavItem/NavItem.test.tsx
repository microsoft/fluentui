import type * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';
import type { NavItemProps } from './NavItem.types';

describe('NavItem', () => {
  isConformant({
    Component: NavItem as React.FunctionComponent<NavItemProps>,
    displayName: 'NavItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `navItemClassNames` is now `{ root }`
    // holding the group marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker`
    // (a default test) replaces it. The `has-static-classnames` testOptions block that
    // asserted the `icon` static went with it — that key no longer exists.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
