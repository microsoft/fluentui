/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Label
} from '../../../../index';

export const IconBasicExample = () => (
  <div>
    <Label>I'm a Label</Label>
    <Label disabled={ true }>I'm a disabled Label</Label>
    <Label required={ true }>I'm a required Label</Label>
  </div>
);
