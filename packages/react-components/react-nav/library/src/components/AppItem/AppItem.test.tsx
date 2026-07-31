import type * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { AppItem } from './AppItem';
import type { AppItemProps } from './AppItem.types';

describe('AppItem', () => {
  isConformant({
    Component: AppItem as React.FunctionComponent<AppItemProps>,
    displayName: 'AppItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `appItemClassNames` is now `{ root }`
    // holding the group marker (DECISIONS.md D16.5/D16.6) and `component-has-group-marker`
    // (a default test) replaces it. The `has-static-classnames` testOptions block that
    // asserted the `icon` static went with it — that key no longer exists.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
