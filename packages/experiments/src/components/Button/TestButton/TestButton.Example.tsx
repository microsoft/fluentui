import * as React from 'react';
import { IBaseButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TestButton, TestMenuButton, TestSplitButton } from './TestButton';
import { TestButtonSmart } from './TestButtonSmart';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class TestButtonExample extends React.Component<IBaseButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <Label>Base Buttons</Label>
        <TestButton
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseButton'
        />
        <TestMenuButton
          disabled={ disabled }
          checked={ checked }
          text='BaseMenuButton'
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
        <TestSplitButton
          split
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseSplitButton'
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
        <Label>Smart Button</Label>
        <TestButtonSmart
          disabled={ disabled }
          checked={ checked }
          onClick={ this._alertClicked }
          text='BaseButton'
        />
        <TestButtonSmart
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
        <TestButtonSmart
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