import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MessageBarActions } from './MessageBarActions';
import type { MessageBarActionsProps } from './MessageBarActions.types';

describe('MessageBarActions', () => {
  isConformant<MessageBarActionsProps>({
    Component: MessageBarActions,
    displayName: 'MessageBarActions',
    disabledTests: [
      // Was already disabled before the statics-removal sweep (original note: "having problems
      // due to the fact root of DialogTitle is Fragment"). It stays disabled, now for the
      // permanent reason: statics removal (DECISIONS.md D16.1 / D16.6) retired this rule for
      // converted packages — see MessageBar.test.tsx. Replaced by `component-has-group-marker`.
      'component-has-static-classnames-object',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
      // it was called with the consumer className last; this component now composes with
      // clsx and never calls mergeClasses, so the test can no longer observe the contract.
      // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
      // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    ],
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-message-bar-actions` marker on the outermost slot, and never at
    // `classList[0]` (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBarActions>Default MessageBarActions</MessageBarActions>);
    expect(result.container).toMatchSnapshot();
  });
});
