import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';

const stackTokens: IStackTokens = { childrenGap: 10 };
const buttonStyles = {
  background: 'transparent',
  border: 'none',
};

export const ToggleCustomLabelExample: React.FunctionComponent = () => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipId = useId('tooltipId');

  const iconWithTooltip = (
    <>
      <TooltipHost content={showTooltip ? 'Info tooltip' : undefined} id={tooltipId}>
        <button
          style={buttonStyles}
          aria-label={showTooltip ? 'Close Tooltip' : 'Open Tooltip'}
          onClick={() => setShowTooltip(!showTooltip)}
          aria-describedby={showTooltip ? tooltipId : undefined}
        >
          <Icon iconName="Info" />
        </button>
      </TooltipHost>
    </>
  );

  return (
    <Stack tokens={stackTokens}>
      <Toggle label={<div>Custom label {iconWithTooltip}</div>} onText="On" offText="Off" onChange={_onChange} />

      <Toggle
        label={<div>Custom inline label {iconWithTooltip}</div>}
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
