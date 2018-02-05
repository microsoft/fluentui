import * as React from 'react';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonCommandExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <div style={ { display: 'flex', alignItems: 'stretch', height: '40px' } }>
          <CommandButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            iconProps={ { iconName: 'Add' } }
            text='Create account'
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
          <CommandButton
            data-automation-id='test2'
            disabled={ disabled }
            checked={ checked }
            iconProps={ { iconName: 'Mail' } }
            text='Send Mail'
          />
        </div>
      </div>
    );
  }
}