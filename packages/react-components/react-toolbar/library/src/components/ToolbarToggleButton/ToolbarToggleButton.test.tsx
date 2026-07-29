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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // Neither this component's styles hook nor @fluentui/react-button's ToggleButton (also
    // converted) calls mergeClasses any more, so `make-styles-overrides-win` has nothing
    // to observe. `classname-overrides-win` is its cascade-native replacement — it passes
    // here because `useToggleButtonStyles_unstable`, called last, composes with clsx and
    // keeps the incoming className (which carries the consumer's) last (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
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
