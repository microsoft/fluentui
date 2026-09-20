import * as React from 'react';

import { Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-modern-components-preview/tooltip';
import type { TooltipProps } from '@fluentui/react-modern-components-preview/tooltip';
import { SlideTextRegular } from '@fluentui/react-icons';

export const Default = (props: Partial<TooltipProps>): React.ReactNode => (
  <Tooltip content="Example tooltip" relationship="label" {...props}>
    <Button icon={<SlideTextRegular />} size="large" />
  </Tooltip>
);

Default.parameters = {
  docs: {
    description: {
      story: `By default, Tooltip appears above its target element, when it is focused or hovered.`,
    },
  },
};
