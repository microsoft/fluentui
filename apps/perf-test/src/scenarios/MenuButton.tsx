import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';

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

const Scenario = () => <DefaultButton text="I am a button" menuProps={menuProps} />;

export default Scenario;
