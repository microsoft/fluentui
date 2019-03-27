import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const TextFieldUnderlinedExample: React.StatelessComponent = () => {
  return (
    <Stack gap={15} maxWidth={300}>
      <TextField label="Standard:" underlined />
      <TextField label="Disabled:" underlined disabled={true} />
      <TextField label="Required:" underlined required={true} placeholder="Enter text here" />
    </Stack>
  );
};
