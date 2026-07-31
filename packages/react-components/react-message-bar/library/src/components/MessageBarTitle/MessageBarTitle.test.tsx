import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MessageBarTitle } from './MessageBarTitle';

describe('MessageBarTitle', () => {
  isConformant({
    Component: MessageBarTitle,
    displayName: 'MessageBarTitle',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1 / D16.6) — see MessageBar.test.tsx for the full
      // rationale. Replaced by `component-has-group-marker` (now a default test).
      'component-has-static-classnames-object',
    ],
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-message-bar-title` marker on the outermost slot, and never at `classList[0]`
    // (DECISIONS.md D15.1 / D16.2).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBarTitle>Default MessageBarTitle</MessageBarTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
