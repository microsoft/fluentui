/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './FocusZone.Disabled.Example.scss';

export const FocusZoneTabbableExample = () => (
  <div className='ms-FocusZoneTabbableExample'>
    <div className='ms-Row'>
      <FocusZone direction={ FocusZoneDirection.horizontal } allowTabKey={ true }>
        <span>Enabled FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField type="text" value='FocusZone TextField' className='ms-FocusZoneDisabledExample-textField' />
        <DefaultButton>Button 3</DefaultButton>
      </FocusZone>
    </div>
  </div>
);
