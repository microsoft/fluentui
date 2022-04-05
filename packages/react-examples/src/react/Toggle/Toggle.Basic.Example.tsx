import * as React from 'react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';

const stackTokens: IStackTokens = { childrenGap: 10 };

export const ToggleBasicExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Enabled and unchecked" onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Disabled and checked" defaultChecked disabled onText="On" offText="Off" />

      <Toggle label="Disabled and unchecked" disabled onText="On" offText="Off" />

      <Toggle label="With inline label" inlineLabel onText="On" offText="Off" onChange={_onChange} />

      <Toggle label="Disabled with inline label" inlineLabel disabled onText="On" offText="Off" />

      <Toggle label="With inline label and without onText and offText" inlineLabel onChange={_onChange} />

      <Toggle label="Disabled with inline label and without onText and offText" inlineLabel disabled />

      <Toggle
        label="Enabled and checked (ARIA 1.0 compatible)"
        defaultChecked
        onText="On"
        offText="Off"
        onChange={_onChange}
        role="checkbox"
      />
    </Stack>
  );
};

function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
  console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
