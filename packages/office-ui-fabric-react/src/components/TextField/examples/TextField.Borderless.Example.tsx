import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

export const TextFieldBorderlessExample: React.FunctionComponent = () => {
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  return (
    <Stack horizontal tokens={{ childrenGap: 50 }} styles={stackStyles}>
      {/* Underlined fields */}
      <Stack {...columnProps}>
        <TextField label="Standard:" underlined />
        <TextField label="Disabled:" underlined disabled defaultValue="I am disabled" />
        <TextField label="Required:" underlined required placeholder="Enter text here" />
      </Stack>

      {/* Borderless fields */}
      <Stack {...columnProps}>
        <TextField label="Borderless single-line TextField" borderless placeholder="No borders here, folks." />
        <TextField label="Borderless multi-line TextField" borderless multiline placeholder="No borders here, folks." />
      </Stack>
    </Stack>
  );
};
