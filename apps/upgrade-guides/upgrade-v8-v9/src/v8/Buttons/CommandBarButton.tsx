import { CommandBarButton, IContextualMenuProps, IIconProps } from '@fluentui/react';
import React from 'react';

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

const addIcon: IIconProps = { iconName: 'Add' };
const mailIcon: IIconProps = { iconName: 'Mail' };

type Props = {};

export const CommandBarButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Command Bar Button</div>
      <div className="description">v8: CommandBarButton --&gt; v9: (none yet)</div>
      <div className="controls row">
        <CommandBarButton iconProps={mailIcon} text="Send mail" />
        <CommandBarButton iconProps={addIcon} text="New item" menuProps={menuProps} />
        <CommandBarButton iconProps={addIcon} text="New item" menuProps={menuProps} split />
      </div>
    </div>
  );
};
