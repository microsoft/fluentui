import * as React from 'react';
import { MenuButton } from '@fluentui/react-button';
import { ContextualMenu } from '@fluentui/react';

const menuProps = {
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

const Scenario = () => <MenuButton text="I am a button" menu={<ContextualMenu {...menuProps} />} />;

export default Scenario;
