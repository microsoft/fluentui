import * as React from 'react';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { HighContrastSelector } from '../../../Styling';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

const alertClicked = (): void => {
  alert('Clicked');
};

export class ButtonSplitCustomExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const customSplitButtonStyles = (): IButtonStyles => {
      return {
        splitButtonMenuButton: { backgroundColor: 'white', width: '10px', border: 'none' },
        splitButtonMenuIcon: { fontSize: '7px' },
        splitButtonDivider: { borderLeft: '1px solid #c8c8c8', right: 17 },
        splitButtonContainer: {
          selectors: {
            [HighContrastSelector]: {
              border: 'none'
            }
          }
        }
      };
    };

    return (
      <div>
        <Label>Split button with icon and custom styles</Label>
        <IconButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          iconProps={{ iconName: 'Upload' }}
          text="Create account"
          onClick={alertClicked}
          split={true}
          aria-roledescription={'split button'}
          styles={customSplitButtonStyles()}
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
      </div>
    );
  }
}
