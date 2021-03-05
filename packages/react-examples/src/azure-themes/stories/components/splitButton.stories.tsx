import * as React from 'react';
import { IContextualMenuProps, Stack } from '@fluentui/react'; // IStackTokens
import { DefaultButton } from '@fluentui/react/lib/Button';

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
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
};
// Example formatting
// const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonSplitExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack tokens={{ childrenGap: 8 }} horizontalAlign="center">
      <DefaultButton
        text="Standard split"
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={false}
      />
      <DefaultButton
        text="Standard checked split"
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={true}
      />
      <DefaultButton
        text="Primary checked split"
        primary
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={true}
      />
      <DefaultButton
        text="Primary split"
        primary
        split
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={false}
      />

      <DefaultButton
        text="(default) Main action disabled split"
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
        text="(primary) Main action disabled split"
        primaryDisabled
        split
        primary
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        menuProps={menuProps}
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
      <DefaultButton
        text="Disabled split"
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
