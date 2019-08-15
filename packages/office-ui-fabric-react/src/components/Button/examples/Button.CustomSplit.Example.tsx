import * as React from 'react';
import { IButtonStyles, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';
import { Label } from 'office-ui-fabric-react/lib/Label';

const customSplitButtonStyles: IButtonStyles = {
  splitButtonMenuButton: { backgroundColor: 'white', width: 28, border: 'none' },
  splitButtonMenuIcon: { fontSize: '7px' },
  splitButtonDivider: { borderLeft: '1px solid #c8c8c8', right: 26 },
  splitButtonContainer: {
    selectors: {
      [HighContrastSelector]: { border: 'none' }
    }
  }
};

export const ButtonSplitCustomExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <div>
      <Label>Split button with icon and custom styles</Label>
      <IconButton
        iconProps={{ iconName: 'Add' }}
        text="New item"
        onClick={_alertClicked}
        split={true}
        aria-roledescription="split button"
        styles={customSplitButtonStyles}
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
        disabled={disabled}
        checked={checked}
      />
    </div>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
