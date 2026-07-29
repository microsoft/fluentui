import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DialogActions } from './DialogActions';
import { isConformant } from '../../testing/isConformant';
import type { DialogActionsProps } from './DialogActions.types';

describe('DialogActions', () => {
  isConformant<DialogActionsProps>({
    Component: DialogActions,
    displayName: 'DialogActions',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format
    // and that every value appears in the rendered DOM. D16.1 removes those statics:
    // `dialogActionsClassNames` is retained but re-pointed to the `group/fui-dialog-actions`
    // marker and narrowed to `{ root: string }` (D16.5), so its sub-assertions are false by
    // construction. `component-has-group-marker` (now a default test) is its replacement —
    // it asserts the marker IS stamped and, critically, that it is never `classList[0]`
    // (D15.1 / D16.2).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogActions>Default DialogActions</DialogActions>);
    expect(result.container).toMatchSnapshot();
  });
});
