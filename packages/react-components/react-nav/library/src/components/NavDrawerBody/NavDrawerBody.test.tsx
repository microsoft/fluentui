import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavDrawerBody } from './NavDrawerBody';

describe('NavDrawerBody', () => {
  isConformant({
    Component: NavDrawerBody,
    displayName: 'NavDrawerBody',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last. It was already disabled here because this
    // component delegates to react-drawer's converted `useDrawerBodyStyles_unstable`; now
    // that react-nav is converted too, nothing in the chain calls mergeClasses at all.
    // `classname-overrides-win` below is the cascade-native replacement (DECISIONS.md D9) and
    // fits from this conversion on.
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // D16 statics-removal sweep retired; `navDrawerBodyClassNames.root` is now the group
    // marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test)
    // replaces it.
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // NavDrawerBody IS a react-drawer DrawerBody — `useNavDrawerBodyStyles_unstable` calls
      // `useDrawerBodyStyles_unstable` on the same state — so the one element carries BOTH
      // markers and the "exactly one" half of `component-has-group-marker` has to be told the
      // whole set (DECISIONS.md D16.3).
      'has-group-marker': { markers: ['group/fui-nav-drawer-body', 'group/fui-drawer-body'] },
    },
  });
});
