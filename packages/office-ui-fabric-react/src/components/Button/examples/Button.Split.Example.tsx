import * as React from 'react';
import { DefaultButton, IContextualMenuProps, Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' }
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' }
    }
  ]
};
// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonSplitExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal wrap tokens={stackTokens}>
      <DefaultButton
        text="Standard"
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
      <DefaultButton
        text="Primary"
        primary
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
      <DefaultButton
        text="Main action disabled"
        primaryDisabled
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
      <DefaultButton
        text="Disabled"
        disabled
        allowDisabledFocus
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        checked={checked}
      />
    </Stack>
  );
};

function _alertClicked() {
  alert('Clicked');
}
