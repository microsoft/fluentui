import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';

export const TextFieldBasicExample: React.StatelessComponent = () => {
  // TextFields don't have to be inside Stacks, we're just using Stacks for layout
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } }
  };

  return (
    <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
      <Stack {...columnProps}>
        <TextField label="Standard" />
        <TextField label="Disabled" disabled defaultValue="I am disabled" />
        <TextField label="Read-only" readOnly defaultValue="I am read-only" />
        <TextField label="Required " required />
        <TextField required />
        <TextField label="With error message" errorMessage="Error message" />
      </Stack>

      <Stack {...columnProps}>
        <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />

        <TextField label="With an icon" iconProps={{ iconName: 'Calendar' }} />

        <TextField label="With placeholder" placeholder="Please enter text here" />
        <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
      </Stack>
    </Stack>
  );
};
