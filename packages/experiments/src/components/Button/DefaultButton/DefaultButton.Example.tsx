import * as React from 'react';
import { IBaseButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from './DefaultButton';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class DefaultButtonExample extends React.Component<IBaseButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <Label>Standard Button</Label>
        <br /> <br />
        <DefaultButton
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseButton'
        />
        <br /> <br />
        <DefaultButton
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
        <br /> <br />
        <DefaultButton
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
        <Label>Primary Button</Label>
        <br /> <br />
        <DefaultButton
          primary
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseButton'
        />
        <br /> <br />
        <DefaultButton
          primary
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
        <br /> <br />
        <DefaultButton
          primary
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