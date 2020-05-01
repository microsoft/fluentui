import * as React from 'react';
import { MaskedTextField, Stack } from 'office-ui-fabric-react';

const maskFormat: { [key: string]: RegExp } = {
  '*': /[a-zA-Z0-9_]/,
};
const stackTokens = { maxWidth: 300 };

export const TextFieldMaskedExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <p>The mask has been modified here to allow "_"</p>
      <MaskedTextField label="With input mask" mask="m\ask: ****" maskFormat={maskFormat} maskChar="?" />
    </Stack>
  );
};
