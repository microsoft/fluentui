import { CommandButton, IContextualMenuProps, IIconProps } from '@fluentui/react';
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
  // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
  // shouldFocusOnMount: false
};

const addIcon: IIconProps = { iconName: 'Add' };

type Props = {};

export const CommandButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Command Button</div>
      <div className="description">v8: CommandButton --&gt; v9: MenuButton</div>
      <div className="controls row">
        <CommandButton iconProps={addIcon} text="New item" menuProps={menuProps} />
      </div>
    </div>
  );
};
