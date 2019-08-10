import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const ToggleBasicExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Enabled and unchecked" onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Disabled and checked" defaultChecked disabled onText="On" offText="Off" />

      <Toggle label="Disabled and unchecked" disabled onText="On" offText="Off" />

      <Toggle label="With inline label" inlineLabel onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Disabled with inline label" inlineLabel disabled onText="On" offText="Off" />

      <Toggle label="With inline label and without onText and offText" inlineLabel onChange={_onChange} />

      <Toggle label="Disabled with inline label and without onText and offText" inlineLabel disabled />
    </Stack>
  );
};

function _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
  console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
