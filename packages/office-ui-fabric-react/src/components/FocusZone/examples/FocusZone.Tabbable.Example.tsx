import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 200 } };
const menuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
};
export const FocusZoneTabbableExample: React.FunctionComponent = () => {
  const tokens = { childrenGap: 20 };
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        handleTabKey={FocusZoneTabbableElements.all}
        isCircularNavigation={true}
      >
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Circular Tabbable FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField placeholder="FocusZone TextField" styles={textFieldStyles} ariaLabel="FocusZone TextField" />
          <DefaultButton>Button 3</DefaultButton>
          <DefaultButton
            text="Create account"
            split={true}
            onClick={alertClicked}
            splitButtonAriaLabel="See 2 sample options"
            menuProps={menuProps}
          />
        </Stack>
      </FocusZone>
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        handleTabKey={FocusZoneTabbableElements.inputOnly}
        isCircularNavigation={false}
      >
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Input Only FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField placeholder="FocusZone TextField" styles={textFieldStyles} ariaLabel="FocusZone TextField" />
          <DefaultButton>Button 3</DefaultButton>
        </Stack>
      </FocusZone>
    </Stack>
  );
};

function alertClicked(): void {
  alert('Clicked');
}
