import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const FocusZoneDisabledExample: React.StatelessComponent = () => (
  <Stack gap={20} horizontalAlign="start">
    <FocusZone direction={FocusZoneDirection.horizontal}>
      <Stack gap={20} horizontal>
        <span>Enabled FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
        <TextField value="FocusZone TextField" styles={{ root: { width: 200 } }} />
        <DefaultButton>Button 3</DefaultButton>
      </Stack>
    </FocusZone>
    <DefaultButton>Tabbable Element 1</DefaultButton>
    <FocusZone disabled={true}>
      <Stack gap={20} horizontal>
        <span>Disabled FocusZone: </span>
        <DefaultButton>Button 1</DefaultButton>
        <DefaultButton>Button 2</DefaultButton>
      </Stack>
    </FocusZone>
    <TextField value="Tabbable Element 2" />
  </Stack>
);
