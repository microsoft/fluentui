import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavDivider } from './NavDivider';

describe('NavDivider', () => {
  isConformant({
    Component: NavDivider,
    displayName: 'NavDivider',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `navDividerClassNames` is now `{ root }`
    // holding the group marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker`
    // (a default test) replaces it. The `has-static-classnames` testOptions block went with
    // it, along with the `wrapper` key.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // NavDivider IS a react-divider Divider — `useNavDividerStyles_unstable` calls
      // `useDividerStyles_unstable` on the same state — so the one element carries BOTH
      // markers and the "exactly one" half of `component-has-group-marker` has to be told
      // the whole set (DECISIONS.md D16.3).
      'has-group-marker': { markers: ['group/fui-nav-divider', 'group/fui-divider'] },
    },
  });
});
