import * as React from 'react';
import { SplitButton } from 'office-ui-fabric-react/lib/SplitButton';

const menuProps = {
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

const scenario = <SplitButton content="I am a button" menu={menuProps} />;

export default scenario;
