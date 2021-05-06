import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const alertClicked = (): void => {
  console.log('Clicked');
};

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

const Scenario = () => <DefaultButton split={true} text="I am a button" onClick={alertClicked} menuProps={menuProps} />;

export default Scenario;
