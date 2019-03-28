import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const TextFieldPrefixAndSuffixExample: React.StatelessComponent = () => {
  return (
    <Stack maxWidth={300} gap={15}>
      <TextField // prettier-ignore
        label="With prefix"
        prefix="https://"
        ariaLabel="Example text field with https:// prefix"
      />
      <TextField // prettier-ignore
        label="Disabled with prefix"
        prefix="https://"
        disabled
        ariaLabel="Example text field with https:// prefix"
      />

      <TextField // prettier-ignore
        label="With suffix"
        suffix=".com"
        ariaLabel="Example text field with .com suffix"
      />

      <TextField
        label="With prefix and suffix"
        prefix="https://"
        suffix=".com"
        ariaLabel="Example text field with https:// prefix and .com suffix"
      />
    </Stack>
  );
};
