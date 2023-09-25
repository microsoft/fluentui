import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

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
        />
        <TextField // prettier-ignore
          label="Disabled with prefix"
          prefix="https://"
          disabled
        />
      </Stack>

      <Stack {...columnProps}>
        <TextField // prettier-ignore
          label="With suffix"
          suffix=".com"
        />

        <TextField label="With prefix and suffix" prefix="https://" suffix=".com" />
      </Stack>
    </Stack>
  );
};
