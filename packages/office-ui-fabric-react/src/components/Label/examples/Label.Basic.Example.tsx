import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useId } from '@uifabric/react-hooks';

export const LabelBasicExample = () => {
  const textFieldId = useId('anInput');
  return (
    <div>
      <Label>I'm a Label</Label>
      <Label disabled>I'm a disabled Label</Label>
      <Label required>I'm a required Label</Label>
      <Label htmlFor={textFieldId}>A Label for An Input</Label>
      <TextField id={textFieldId} />
    </div>
  );
};
