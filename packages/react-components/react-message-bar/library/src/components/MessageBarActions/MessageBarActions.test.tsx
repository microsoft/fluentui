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
      // `classname-overrides-win` (extraTests below) pins the styling override contract
      // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
      // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
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
