import * as React from 'react';
import { IContextualMenuProps, IIconProps } from '@fluentui/react';
import { CommandButton } from '@fluentui/react/lib/Button';

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
  // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
  // shouldFocusOnMount: false
};

const addIcon: IIconProps = { iconName: 'Add' };

export const ButtonCommandExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <CommandButton iconProps={addIcon} text="New item" menuProps={menuProps} disabled={disabled} checked={checked} />
  );
};
