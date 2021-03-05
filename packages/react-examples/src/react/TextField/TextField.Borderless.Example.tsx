import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const TextFieldBorderlessExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField label="Standard:" underlined />
        <TextField label="Disabled:" underlined disabled defaultValue="I am disabled" />
        <TextField label="Required:" underlined required placeholder="Enter text here" />
      </Stack>
      <Stack {...columnProps}>
        <TextField label="Borderless single-line TextField" borderless placeholder="No borders here, folks." />
        <TextField label="Borderless multi-line TextField" borderless multiline placeholder="No borders here, folks." />
      </Stack>
    </Stack>
  );
};
