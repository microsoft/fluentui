import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';

export const LabelBasicExample = () => (
  <div>
    <Label>I'm a Label</Label>
    <Label disabled={ true }>I'm a disabled Label</Label>
    <Label required={ true }>I'm a required Label</Label>
  </div>
);
