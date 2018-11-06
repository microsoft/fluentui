// @codepen
import * as React from 'react';

import { Label, TextField } from 'office-ui-fabric-react';

export const LabelBasicExample = () => (
  <div>
    <Label>I'm a Label</Label>
    <Label disabled={true}>I'm a disabled Label</Label>
    <Label required={true}>I'm a required Label</Label>
    <Label for="anInput">A Label for An Input</Label>
    <TextField id="anInput" />
  </div>
);
