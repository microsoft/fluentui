import * as React from 'react';
import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getCustomSplitButtonStyles } from './Button.Split.Example.styles';

const alertClicked = (): void => {
  alert('Clicked');
};

export class ButtonSplitExample extends React.Component<IButtonProps, {}> {
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

export class ButtonSplitCustomExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;
    const customSplitButtonStyles = getCustomSplitButtonStyles();

    return (
      <div>
        <Label>Split button with icon and custom styles</Label>
        <IconButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          iconProps={ { iconName: 'Emoji2' } }
          text='Create account'
          onClick={ alertClicked }
          split={ true }
          styles={ customSplitButtonStyles }
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
