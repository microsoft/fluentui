import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Popover, PopoverSurface, PopoverTrigger, Button } from '@fluentui/react-components';
import { CalendarMonthRegular, Accessibility24Filled } from '@fluentui/react-icons';

export const WithPopover = (props: Partial<ToolbarProps>) => (
  <Toolbar {...props} size="small">
    <Popover withArrow>
      <PopoverTrigger disableButtonEnhancement>
        <ToolbarButton appearance="primary">See more...</ToolbarButton>
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <h3>Popover content</h3>
          <Button>Action</Button>
        </div>
      </PopoverSurface>
    </Popover>
    <ToolbarDivider />
    <Popover withArrow>
      <PopoverTrigger disableButtonEnhancement>
        <ToolbarButton aria-label="Popover trigger - Calendar" icon={<CalendarMonthRegular />} />
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <h3>Popover content</h3>
          <Button>Action</Button>
        </div>
      </PopoverSurface>
    </Popover>
    <Popover withArrow>
      <PopoverTrigger disableButtonEnhancement>
        <ToolbarButton aria-label="Popover trigger - Accessibility" icon={<Accessibility24Filled />} />
      </PopoverTrigger>
      <PopoverSurface>
        <div>
          <h3>Popover content - Accessibility</h3> <Button>Action</Button>
        </div>
      </PopoverSurface>
    </Popover>
  </Toolbar>
);
