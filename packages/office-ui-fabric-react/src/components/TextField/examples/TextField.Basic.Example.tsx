import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const TextFieldBasicExample: React.StatelessComponent = () => {
  return (
    <Stack gap={15} maxWidth={300}>
      <TextField label="Standard" />
      <TextField label="Disabled" disabled />
      <TextField label="Read-only" readOnly />
      <TextField label="Required " required />
      <TextField label="With error message" errorMessage="Error message" />
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />
      <TextField label="With an icon" iconProps={{ iconName: 'Calendar' }} />
    </Stack>
  );
};
