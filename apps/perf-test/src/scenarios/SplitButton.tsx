import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

const alertClicked = (): void => {
  alert('Clicked');
};

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

const scenario = <DefaultButton split={true} text="I am a button" onClick={alertClicked} menuProps={menuProps} />;

export default scenario;
