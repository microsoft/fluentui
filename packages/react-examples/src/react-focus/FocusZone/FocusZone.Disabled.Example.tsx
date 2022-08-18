import * as React from 'react';

import { DefaultButton } from '@fluentui/react/lib/Button';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 200 } };

export const FocusZoneDisabledExample: React.FunctionComponent = () => {
  const tokens = { childrenGap: 20 };
  const fzRef = React.useRef<FocusZone>(null);
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      {/* <FocusZone direction={FocusZoneDirection.horizontal} componentRef={ref => (fzRef.current = ref || undefined)}> */}
      <FocusZone direction={FocusZoneDirection.horizontal} ref={fzRef}>
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Enabled FocusZone: </span>
          <DefaultButton style={{ visibility: 'hidden' }}>Button 0</DefaultButton>
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
      <DefaultButton onClick={() => fzRef.current?.focus(true)}>Set Focus to the first Focus Zone - OLD</DefaultButton>
      <DefaultButton onClick={() => fzRef.current?.focus(true, true)}>
        Set Focus to the first Focus Zone - Bypass hidden
      </DefaultButton>
    </Stack>
  );
};
