import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { Tooltip } from '@fluentui/react-tooltip';
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
