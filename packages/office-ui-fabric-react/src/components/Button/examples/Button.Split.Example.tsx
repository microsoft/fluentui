import * as React from 'react';
import { DefaultButton, IButtonProps, ILabelStyles, Label, Stack } from 'office-ui-fabric-react';

const labelStyles: Partial<ILabelStyles> = {
  root: { marginBottom: 10 }
};

export const ButtonSplitExample: React.FunctionComponent<IButtonProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal wrap tokens={{ childrenGap: 40 }}>
      <div>
        <Label styles={labelStyles}>Standard</Label>
        <DefaultButton
          disabled={disabled}
          checked={checked}
          text="New item"
          onClick={_alertClicked}
          split={true}
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          style={{ height: '35px' }}
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
      <div>
        <Label styles={labelStyles}>Primary</Label>
        <DefaultButton
          primary
          disabled={disabled}
          checked={checked}
          text="New item"
          onClick={_alertClicked}
          split={true}
          aria-roledescription="split button"
          style={{ height: '35px' }}
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
      <div>
        <Label styles={labelStyles}>Primary Action Disabled</Label>
        <DefaultButton
          primary
          disabled={disabled}
          primaryDisabled={true}
          checked={checked}
          text="New item"
          onClick={_alertClicked}
          split={true}
          aria-roledescription="split button"
          style={{ height: '35px' }}
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
      <div>
        <Label styles={labelStyles}>Button Disabled</Label>
        <DefaultButton
          primary
          disabled={true}
          allowDisabledFocus={true}
          checked={checked}
          text="New item"
          onClick={_alertClicked}
          onKeyPress={_alertClicked}
          onKeyDown={_alertClicked}
          onKeyUp={_alertClicked}
          onMouseDown={_alertClicked}
          onMouseUp={_alertClicked}
          split={true}
          aria-roledescription="split button"
          style={{ height: '35px' }}
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
    </Stack>
  );
};

function _alertClicked() {
  alert('Clicked');
}
