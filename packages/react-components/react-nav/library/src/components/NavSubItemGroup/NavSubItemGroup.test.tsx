import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavSubItemGroup } from './NavSubItemGroup';
import type { NavCategoryContextValue } from '../NavCategoryContext';
import { NavCategoryProvider } from '../NavCategoryContext';

export function mockNavCategoryContextValue(partialValue?: Partial<NavCategoryContextValue>): NavCategoryContextValue {
  return {
    open: false,
    value: '',
    ...partialValue,
  };
}

const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
  <NavCategoryProvider
    value={mockNavCategoryContextValue({
      open: true,
    })}
  >
    {props.children}
  </NavCategoryProvider>
);

describe('NavSubItemGroup', () => {
  isConformant({
    Component: NavSubItemGroup,
    displayName: 'NavSubItemGroup',
    renderOptions: { wrapper: Wrapper },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // D16 statics-removal sweep retired; `navSubItemGroupClassNames.root` is now the group
    // marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test)
    // replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
