import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToastFooter } from './ToastFooter';
import { isConformant } from '../../testing/isConformant';

describe('ToastFooter', () => {
  isConformant({
    Component: ToastFooter,
    displayName: 'ToastFooter',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-group-marker` runs from the DEFAULT set: it asserts
    // `group/fui-toast-footer` is stamped and never `classList[0]` (D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<ToastFooter>Default ToastFooter</ToastFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
