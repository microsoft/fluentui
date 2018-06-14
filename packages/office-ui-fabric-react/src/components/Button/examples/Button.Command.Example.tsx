import * as React from 'react';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonCommandExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>
          <CommandButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Add' }}
            text="Create account"
            menuProps={{
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
            }}
          />
          <CommandButton
            data-automation-id="test2"
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Mail' }}
            text="Send Mail"
          />
        </div>
      </div>
    );
  }
}
