import type * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { AppItemStatic } from './AppItemStatic';
import type { AppItemStaticProps } from './AppItemStatic.types';

describe('AppItemStatic', () => {
  isConformant({
    Component: AppItemStatic as React.FunctionComponent<AppItemStaticProps>,
    displayName: 'AppItemStatic',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>__<slot>`
    // format the D16 statics-removal sweep retired; `appItemStaticClassNames` is now
    // `{ root }` holding the group marker (DECISIONS.md D16.5/D16.6) and
    // `component-has-group-marker` (a default test) replaces it. The `has-static-classnames`
    // testOptions block that asserted the `icon` static went with it — that key no longer
    // exists.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
});
