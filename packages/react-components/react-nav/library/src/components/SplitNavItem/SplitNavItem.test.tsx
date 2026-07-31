import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { SplitNavItem } from './SplitNavItem';

describe('SplitNavItem', () => {
  isConformant({
    Component: SplitNavItem,
    displayName: 'SplitNavItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `splitNavItemClassNames` is now
    // `{ root }` holding the group marker (DECISIONS.md D16.5/D16.6) and
    // `component-has-group-marker` (a default test) replaces it. The `has-static-classnames`
    // testOptions block that asserted the five slot statics went with it — the three button
    // slots are now styled through JS slot composition plus `group-*/fui-split-nav-item`
    // variants (D16.3, mechanism M2), so there is nothing public left to assert.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
