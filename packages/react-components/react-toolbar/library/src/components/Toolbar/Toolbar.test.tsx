import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Toolbar } from './Toolbar';
import { isConformant } from '../../testing/isConformant';

describe('Toolbar', () => {
  isConformant({
    Component: Toolbar,
    displayName: 'Toolbar',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` /
    // `fui-<Component>__<slot>` format, which D16.1 removed from this package:
    // `toolbarClassNames` is retained but re-pointed to the group marker and narrowed to
    // `{ root }`. The test is deleted from the default set repo-wide when the sweep completes
    // (D16.6); until then converted packages opt out here. `component-has-group-marker` (now a default test)
    // replaces it — it asserts the marker IS stamped and, crucially, that it is never
    // `classList[0]` (D16.2).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onCheckedValueChange'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Toolbar>Default Toolbar</Toolbar>);
    expect(result.container).toMatchSnapshot();
  });
});
