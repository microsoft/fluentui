import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { ToolbarRadioButton } from './ToolbarRadioButton';
import { isConformant } from '../../testing/isConformant';
import type { ToggleButtonProps } from '@fluentui/react-button';
import userEvent from '@testing-library/user-event';
import { Toolbar } from '../Toolbar/Toolbar';

describe('ToolbarRadioButton', () => {
  isConformant({
    Component: ToolbarRadioButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarRadioButton',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind) — same
    // reasoning as ToolbarToggleButton.test.tsx: nothing in this component's delegation
    // chain calls mergeClasses any more, so `make-styles-overrides-win` has nothing to
    // observe and `classname-overrides-win` replaces it (DECISIONS.md D9).
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    testOptions: {
      // renders react-button’s ToggleButton, which renders Button — each hook stamps its own marker on the one element, so this root
      // legitimately carries every marker below (DECISIONS.md D16.3). Declaring the whole set
      // keeps `component-has-group-marker` running: it is an exact set comparison, so an
      // undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-button', 'group/fui-toggle-button', 'group/fui-toolbar-radio-button'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarRadioButton name="name" value="value">
        Default ToolbarRadio
      </ToolbarRadioButton>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('should call onCheckedValueChange with proper value', () => {
    const onCheckedValueChange = jest.fn();

    const { getByText } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarRadioButton name="text" value="italic">
          italic
        </ToolbarRadioButton>
        <ToolbarRadioButton name="text" value="bold">
          bold
        </ToolbarRadioButton>
      </Toolbar>,
    );

    userEvent.click(getByText('bold'));

    expect(onCheckedValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'click',
      }),
      expect.objectContaining({
        checkedItems: expect.arrayContaining(['bold']),
      }),
    );
  });

  it('should check the proper value', () => {
    const onCheckedValueChange = jest.fn();

    const { getByText } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarRadioButton name="text" value="italic">
          italic
        </ToolbarRadioButton>
        <ToolbarRadioButton name="text" value="bold">
          bold
        </ToolbarRadioButton>
      </Toolbar>,
    );

    userEvent.click(getByText('bold'));

    expect(getByText('bold').getAttribute('aria-checked')).toBe('true');
  });
});
