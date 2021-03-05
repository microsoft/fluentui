import * as React from 'react';

import { DefaultButton } from '@fluentui/react/lib/Button';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 200 } };

export const FocusZoneDisabledExample: React.FunctionComponent = () => {
  const tokens = { childrenGap: 20 };
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Enabled FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField placeholder="FocusZone TextField" styles={textFieldStyles} ariaLabel="FocusZone TextField" />
          <DefaultButton>Button 3</DefaultButton>
        </Stack>
      </FocusZone>
      <DefaultButton>Tabbable Element 1</DefaultButton>
      <FocusZone disabled={true}>
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Disabled FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
        </Stack>
      </FocusZone>
      <TextField placeholder="Tabbable Element 2" ariaLabel="Tabbable Element 2" />
    </Stack>
  );
};
