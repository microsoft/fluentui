import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToolbarToggleButton } from './ToolbarToggleButton';
import { isConformant } from '../../testing/isConformant';
import type { ToggleButtonProps } from '@fluentui/react-button';

describe('ToolbarToggleButton', () => {
  isConformant({
    Component: ToolbarToggleButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarToggleButton',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // renders react-button’s ToggleButton, which renders Button — each hook stamps its own marker on the one element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-toggle-button', 'group/fui-toolbar-toggle-button'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarToggleButton name="name" value="value">
        Default ToolbarToggleButton
      </ToolbarToggleButton>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
