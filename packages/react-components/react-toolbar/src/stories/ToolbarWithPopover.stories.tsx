import * as React from 'react';
import { Toolbar, ToolbarProps } from '../index';
import { ToolbarButton } from '../ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const WithPopover = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Popover>
      <PopoverTrigger>
        <ToolbarButton>Click here</ToolbarButton>
      </PopoverTrigger>
      <PopoverSurface>
        <div>Popover content</div>
      </PopoverSurface>
    </Popover>
    <ToolbarDivider />
    <Popover>
      <PopoverTrigger>
        <ToolbarButton icon={<CalendarMonthRegular />} />
      </PopoverTrigger>
      <PopoverSurface>
        <div>Popover content</div>
      </PopoverSurface>
    </Popover>
  </Toolbar>
);
