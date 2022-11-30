import type { IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { Stack } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as React from 'react';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const ToggleBasicExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" onChange={_onChange} />

        <Toggle label="Enabled and unchecked" onText="On" offText="Off" onChange={_onChange} />

        <Toggle label="Disabled and checked" defaultChecked disabled onText="On" offText="Off" />

        <Toggle label="Disabled and unchecked" disabled onText="On" offText="Off" />

        <Toggle label="With inline label" inlineLabel onText="On" offText="Off" onChange={_onChange} />
      </Stack>
      <Stack {...columnProps}>
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
    </Stack>
  );
};

function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
  console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
