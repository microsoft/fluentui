import * as React from 'react';
import { DefaultButton, IconButton, IButtonBaseProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

// tslint:disable-next-line:jsx-no-lambda
const alertClicked = (): void => {
  alert('Clicked');
};

export class ButtonSplitExample extends React.Component<IButtonBaseProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsTwoUp'>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Create account'
            onClick={ alertClicked }
            split={ true }
            ariaLabel={ 'See 2 sample options' }
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
        <div>
          <Label>Primary</Label>
          <DefaultButton
            primary
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Create account'
            onClick={ alertClicked }
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
        <div>
          <Label>Primary Action Disabled</Label>
          <DefaultButton
            primary
            data-automation-id='test'
            disabled={ disabled }
            primaryDisabled={ true }
            checked={ checked }
            text='Create account'
            onClick={ alertClicked }
            split={ true }
            style={ { height: '35px' } }
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

export class ButtonSplitCustomExample extends React.Component<IButtonBaseProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div>
        <Label>Split button with icon and custom styles</Label>
        <IconButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          iconProps={ { iconName: 'Upload' } }
          text='Create account'
          onClick={ alertClicked }
          split={ true }
          // tslint:disable-next-line:jsx-no-lambda
          getStyles={ (props) => ({
            button: { backgroundColor: 'white', width: '10px' },
            menuIcon: { fontSize: '7px' }
            // @TODO fix once divider is converted
            // splitButtonDivider: { borderLeft: '1px solid #c8c8c8', right: 12 }
          })
          }
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
