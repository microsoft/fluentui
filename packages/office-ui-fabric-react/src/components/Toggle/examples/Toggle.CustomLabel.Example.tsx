import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

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

function _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
  console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
