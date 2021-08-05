import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TooltipHost, TooltipDelay, DirectionalHint, ITooltipProps, ITooltipHostStyles } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

const tooltipProps: ITooltipProps = {
  onRenderContent: () => (
    <ul style={{ margin: 10, padding: 0 }}>
      <li>1. One</li>
      <li>2. Two</li>
    </ul>
  ),
};
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

export const TooltipCustomExample: React.FunctionComponent = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId('tooltip');

  return (
    <TooltipHost
      tooltipProps={tooltipProps}
      delay={TooltipDelay.zero}
      id={tooltipId}
      directionalHint={DirectionalHint.bottomCenter}
      styles={hostStyles}
    >
      <DefaultButton aria-describedby={tooltipId} text="Hover over me" />
    </TooltipHost>
  );
};
