/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { FocusZone, Button, TextField } from '../../../../index';
import './FocusZone.Disabled.Example.scss';

export const FocusZoneDisabledExample = () => (
  <div className='ms-FocusZoneDisabledExample'>
    <div className='ms-Row'>
      <FocusZone>
        <span>Enabled FocusZone: </span>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </FocusZone>
    </div>
    <div className='ms-Row'>
      <Button>Tabbable Element 1</Button>
    </div>
    <div className='ms-Row'>
      <FocusZone disabled={true}>
        <span>Disabled FocusZone: </span>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </FocusZone>
    </div>
    <div className='ms-Row'>
      <TextField value='Tabbable Element 2' />
    </div>
  </div>
);
