import * as React from 'react';
import { ContextualMenu, IContextualMenuProps, IIconProps } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const menuProps: IContextualMenuProps = {
  // For example: disable dismiss if shift key is held down while dismissing
  onDismiss: ev => {
    if (ev && 'shiftKey' in ev) {
      ev.preventDefault();
    }
  },
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
  directionalHintFixed: true,
};
const addIcon: IIconProps = { iconName: 'Add' };

export const ButtonContextualMenuExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  const buttonProps = {
    text: 'New item',
    iconProps: addIcon,
    menuProps: menuProps,
    // Optional callback to customize menu rendering
    menuAs: _getMenu,
    // Optional callback to do other actions (besides opening the menu) on click
    // onMenuClick={_onMenuClick}
    // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
    // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
    // persistMenu={true}
    allowDisabledFocus: true,
    disabled: disabled,
    checked: checked,
  };
  return (
    <>
      <DefaultButton {...buttonProps} />
      <PrimaryButton {...buttonProps} />
    </>
  );
};

function _getMenu(props: IContextualMenuProps): JSX.Element {
  // Customize contextual menu with menuAs
  return <ContextualMenu {...props} />;
}

// function _onMenuClick(ev?: React.SyntheticEvent<string>) {
//   console.log(ev);
// }
