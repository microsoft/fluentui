import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './FocusZone.Tabbable.Example.scss';

const alertClicked = (): void => {
  alert('Clicked');
};

export const FocusZoneTabbableExample = () => (
  <div className="ms-FocusZoneTabbableExample">
    <div className="ms-Row">
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.all} isCircularNavigation={true}>
        <span>Circular Tabbable FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField value="FocusZone TextField" className="ms-FocusZoneTabbableExample-textField" />
        <DefaultButton>Button 3</DefaultButton>
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          splitButtonAriaLabel={'See 2 sample options'}
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
      </FocusZone>
    </div>
    <div className="ms-Row">
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.inputOnly} isCircularNavigation={false}>
        <span>Input Only FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField value="FocusZone TextField" className="ms-FocusZoneTabbableExample-textField" />
        <DefaultButton>Button 3</DefaultButton>
      </FocusZone>
    </div>
  </div>
);
