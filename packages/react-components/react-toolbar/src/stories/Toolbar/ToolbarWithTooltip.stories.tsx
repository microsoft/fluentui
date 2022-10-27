import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular, TextBold24Regular } from '@fluentui/react-icons';

export const WithTooltip = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Tooltip content="Makes text bold" relationship="label" withArrow>
      <ToolbarButton appearance="primary" icon={<TextBold24Regular />} />
    </Tooltip>
    <ToolbarDivider />
    <Tooltip content="With calendar icon" relationship="label" withArrow>
      <ToolbarButton icon={<CalendarMonthRegular />} />
    </Tooltip>
  </Toolbar>
);
