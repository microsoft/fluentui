import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';

export const TextFieldPlaceholderExample: React.StatelessComponent = () => {
  const stackTokens: IStackTokens = { childrenGap: 15 };

  return (
    <Stack tokens={stackTokens} maxWidth={300}>
      <TextField label="With placeholder" placeholder="Please enter text here" />
      <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
    </Stack>
  );
};
