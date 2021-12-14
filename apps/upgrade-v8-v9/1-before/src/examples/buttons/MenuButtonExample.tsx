import { DefaultButton, IContextualMenuProps, IIconProps } from '@fluentui/react';
import React from 'react';

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

type Props = {};

export const MenuButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Menu Button</div>
      <div className="description">v8: DefaultButon --&gt; v9: Button</div>
      <div className="controls row">
        <DefaultButton text="New item" iconProps={addIcon} menuProps={menuProps} />
      </div>
    </div>
  );
};
