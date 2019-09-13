import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const FocusZoneDisabledExample: React.StatelessComponent = () => {
  const tokens = { childrenGap: 20 };
  return (
    <Stack tokens={tokens} horizontalAlign="start">
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <Stack tokens={tokens} horizontal verticalAlign="center">
          <span>Enabled FocusZone: </span>
          <DefaultButton>Button 1</DefaultButton>
          <DefaultButton>Button 2</DefaultButton>
          <TextField placeholder="FocusZone TextField" styles={{ root: { width: 200 } }} ariaLabel="FocusZone TextField" />
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
