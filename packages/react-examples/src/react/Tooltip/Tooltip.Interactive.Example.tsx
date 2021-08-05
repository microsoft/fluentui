import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { useId } from '@fluentui/react-hooks';

const styles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
const calloutProps = { gapSpace: 0 };

export const TooltipInteractiveExample: React.FunctionComponent = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');

  return (
    <div>
      <TooltipHost
        content="This is the tooltip"
        // Give the user more time to interact with the tooltip before it closes
        closeDelay={500}
        id={tooltipId}
        calloutProps={calloutProps}
        styles={styles}
      >
        <DefaultButton aria-describedby={tooltipId}>Interact with my tooltip</DefaultButton>
      </TooltipHost>
    </div>
  );
};
