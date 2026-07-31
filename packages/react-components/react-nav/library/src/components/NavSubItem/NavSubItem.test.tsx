import type * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';
import type { NavSubItemProps } from './NavSubItem.types';

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem as React.FunctionComponent<NavSubItemProps>,
    displayName: 'NavSubItem',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // D16 statics-removal sweep retired; `navSubItemClassNames.root` is now the group marker
    // (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test) replaces
    // it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
