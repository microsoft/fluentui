import * as React from 'react';
import { IBaseButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DefaultSplitButton } from './DefaultButton';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class DefaultButtonExample extends React.Component<IBaseButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <Label>Smart Button</Label>
        <DefaultSplitButton
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseButton'
        />
        <DefaultSplitButton
          disabled={ disabled }
          checked={ checked }
          text='Menu'
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
        <DefaultSplitButton
          disabled={ disabled }
          checked={ checked }
          text='Split'
          split
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
        />
      </div >

    );
  }

  private _alertClicked = () => {
    alert('Clicked');
  }
}