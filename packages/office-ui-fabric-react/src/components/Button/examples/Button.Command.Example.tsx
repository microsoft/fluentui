import * as React from 'react';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonCommandExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <div>
          <CommandButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            iconProps={ { iconName: 'Add' } }
            text='Create account'
            onMenuToggled={ (button) => console.log(button) }
            menuProps={ {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail'
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ]
            } }
          />
        </div>
      </div>
    );
  }
}