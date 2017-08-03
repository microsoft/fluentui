import * as React from 'react';
import { DefaultButton, IconButton, IButtonProps, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonSplitExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <Label>Split button</Label>
        <DefaultButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          text='Create account'
          onClick={ () => alert('Clicked') }
          split={ true }
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
    );
  }
}

export class ButtonSplitCustomExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;
    const style: IButtonStyles = { splitButtonMenuButton: { backgroundColor: 'white', width: '10px' }, splitButtonMenuIcon: { fontSize: '7px' } };

    return (
      <div>
        <Label>Custom Split button</Label>
        <IconButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          iconProps={ { iconName: 'Emoji2' } }
          text='Create account'
          onClick={ () => alert('Clicked') }
          split={ true }
          styles={ style }
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
    );
  }
}