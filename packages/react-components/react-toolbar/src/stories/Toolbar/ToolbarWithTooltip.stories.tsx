import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Tooltip } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const WithTooltip = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Tooltip content="No Icon On this one" relationship="label" withArrow>
      <ToolbarButton>Hover me</ToolbarButton>
    </Tooltip>
    <ToolbarDivider />
    <Tooltip content="With calendar icon" relationship="label" withArrow>
      <ToolbarButton icon={<CalendarMonthRegular />} />
    </Tooltip>
    <ToolbarButton>Click me</ToolbarButton>
    <ToolbarButton>Hover me</ToolbarButton>
    <ToolbarDivider />
  </Toolbar>
);
