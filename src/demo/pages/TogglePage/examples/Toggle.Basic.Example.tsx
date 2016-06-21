/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Toggle
} from '../../../../index';

export const ToggleBasicExample = () => (
  <div>
    <Toggle
      defaultChecked={ true }
      label='Enabled and checked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ false }
      label='Enabled and unchecked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ true }
      disabled={ true }
      label='Disabled and checked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ false }
      disabled={ true }
      label='Disabled and unchecked'
      onText='On'
      offText='Off' />
  </div>
);
