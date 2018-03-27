/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { DefaultButton, BaseButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './FocusZone.Tabbable.Example.scss';

const alertClicked = (): void => {
  alert('Clicked');
};

export const FocusZoneTabbableExample = () => (
  <div className='ms-FocusZoneTabbableExample'>
    <div className='ms-Row'>
      <FocusZone direction={ FocusZoneDirection.horizontal } handleTabKey={ FocusZoneTabbableElements.all } isCircularNavigation={ true }>
        <span>Circular Tabbable FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField value='FocusZone TextField' className='ms-FocusZoneTabbableExample-textField' />
        <DefaultButton>Button 3</DefaultButton>
        <DefaultButton
          text='Create account'
          split={ true }
          onClick={ alertClicked }
          splitButtonAriaLabel={ 'See 2 sample options' }
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
      </FocusZone>
    </div>
    <div className='ms-Row'>
      <FocusZone direction={ FocusZoneDirection.horizontal } handleTabKey={ FocusZoneTabbableElements.inputOnly } isCircularNavigation={ false }>
        <span>Input Only FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField value='FocusZone TextField' className='ms-FocusZoneTabbableExample-textField' />
        <DefaultButton>Button 3</DefaultButton>
      </FocusZone>
    </div>
  </div>
);
