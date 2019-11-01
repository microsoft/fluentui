import * as React from 'react';
import { IButtonStyles, IconButton, HighContrastSelector, Label, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

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

const menuProps: IContextualMenuProps = {
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
};

const addIcon: IIconProps = { iconName: 'Add' };

export const ButtonSplitCustomExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <div>
      <Label>Split button with icon and custom styles</Label>
      <IconButton
        split
        iconProps={addIcon}
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        styles={customSplitButtonStyles}
        menuProps={menuProps}
        ariaLabel="New item"
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
    </div>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
