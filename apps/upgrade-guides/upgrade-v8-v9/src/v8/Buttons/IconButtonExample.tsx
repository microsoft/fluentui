import { IconButton, IContextualMenuProps, IIconProps } from '@fluentui/react';
import React from 'react';

const emojiIcon: IIconProps = { iconName: 'Emoji2' };

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
  directionalHintFixed: true,
};

type Props = {};

export const IconButtonExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Icon Button</div>
      <div className="description">v8: IconButton --&gt; v9: Button</div>
      <div className="row">
        <IconButton iconProps={emojiIcon} title="IconButton" ariaLabel="IconButton" />
        <IconButton menuProps={menuProps} iconProps={emojiIcon} title="IconButton" ariaLabel="IconButton" />
      </div>
    </div>
  );
};
