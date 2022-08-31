import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
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
