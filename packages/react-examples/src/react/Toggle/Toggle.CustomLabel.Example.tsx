import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';

const stackTokens: IStackTokens = { childrenGap: 10 };

export const ToggleCustomLabelExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Toggle
        label={
          <div>
            Custom label{' '}
            <TooltipHost content="Info tooltip">
              <Icon iconName="Info" aria-label="Info tooltip" />
            </TooltipHost>
          </div>
        }
        onText="On"
        offText="Off"
        onChange={_onChange}
      />

      <Toggle
        label={
          <div>
            Custom inline label{' '}
            <TooltipHost content="Info tooltip">
              <Icon iconName="Info" aria-label="Info tooltip" />
            </TooltipHost>
          </div>
        }
        inlineLabel
        onText="On"
        offText="Off"
        onChange={_onChange}
      />
    </Stack>
  );
};

function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
  console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
