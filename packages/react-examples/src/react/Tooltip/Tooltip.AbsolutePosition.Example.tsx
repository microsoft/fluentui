import * as React from 'react';
import { DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { useId, useConst } from '@fluentui/react-hooks';

const rootStyles = { minHeight: 50 };
const buttonStyles: Partial<IButtonStyles> = {
  root: { position: 'absolute', left: 200 },
};

export const TooltipAbsolutePositionExample: React.FunctionComponent = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');
  const buttonId = useId('targetButton');

  const calloutProps = useConst({
    gapSpace: 0,
    // If the tooltip should point to an absolutely-positioned element,
    // you must manually specify the callout target.
    target: `#${buttonId}`,
  });

  return (
    <div style={rootStyles}>
      <TooltipHost content="This is the tooltip" id={tooltipId} calloutProps={calloutProps}>
        <DefaultButton
          // Button is absolutely positioned (see above)
          styles={buttonStyles}
          id={buttonId}
          aria-describedby={tooltipId}
        >
          Hover over me
        </DefaultButton>
      </TooltipHost>
    </div>
  );
};
