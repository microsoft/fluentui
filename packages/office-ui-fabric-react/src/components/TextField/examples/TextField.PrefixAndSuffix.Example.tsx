import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };

export const TextFieldPrefixAndSuffixExample: React.FunctionComponent = () => {
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
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
      </Stack>

      <Stack {...columnProps}>
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
    </Stack>
  );
};
