import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const alertClicked = (): void => {
  alert('Clicked');
};

export const FocusZoneTabbableExample: React.StatelessComponent = () => {
  const tokens = { childrenGap: 20 };
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.all} isCircularNavigation={true}>
        <Stack tokens={tokens} horizontal>
          <span>Circular Tabbable FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField value="FocusZone TextField" styles={{ root: { width: 200 } }} />
          <DefaultButton>Button 3</DefaultButton>
          <DefaultButton
            text="Create account"
            split={true}
            onClick={alertClicked}
            splitButtonAriaLabel="See 2 sample options"
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
        </Stack>
      </FocusZone>
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.inputOnly} isCircularNavigation={false}>
        <Stack tokens={tokens} horizontal>
          <span>Input Only FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField value="FocusZone TextField" styles={{ root: { width: 200 } }} />
          <DefaultButton>Button 3</DefaultButton>
        </Stack>
      </FocusZone>
    </Stack>
  );
};
