import * as React from 'react';
import { IButtonProps, BaseButton } from 'office-ui-fabric-react/lib/Button';

export class ButtonBaseExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>

        <BaseButton
          disabled={ disabled }
          checked={ checked }
          text='BaseButton'
          description='description'
          onClick={ this._alertClicked }
        />
        {/* <BaseButton
          disabled={ disabled }
          checked={ checked }
          text='ContextualButton'
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

        <BaseButton
          disabled={ disabled }
          checked={ checked }
          text='SplitButton'
          split
          primaryDisabled={ true }
          onClick={ this._alertClicked }
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
        /> */}
      </div>

    );
  }

  private _alertClicked = () => {
    alert('Clicked');
  }
}