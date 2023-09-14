import * as React from 'react';
import type { ToolbarProps } from '@fluentui/react-components';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
} from '@fluentui/react-components';
import { MathFormatLinear24Regular, Image24Regular, Table24Filled } from '@fluentui/react-icons';

export const WithPopover = (props: Partial<ToolbarProps>) => {
  const [open, setOpen] = React.useState<'first' | 'second' | 'third' | 'fourth' | undefined>();

  return (
    <Toolbar aria-label="with Popover" {...props} size="small">
      <Popover
        withArrow
        trapFocus
        open={open === 'first'}
        onOpenChange={(_, data) => setOpen(data.open ? 'first' : undefined)}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton aria-label="Insert image" icon={<Image24Regular />} />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Insert Image</h3>
            <Button onClick={() => setOpen(undefined)}>Close</Button>
          </div>
        </PopoverSurface>
      </Popover>
      <Popover
        withArrow
        trapFocus
        open={open === 'second'}
        onOpenChange={(_, data) => setOpen(data.open ? 'second' : undefined)}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton appearance="primary" icon={<Table24Filled />} aria-label="Insert Table" />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Insert Table</h3>
            <Button onClick={() => setOpen(undefined)}>Close</Button>
          </div>
        </PopoverSurface>
      </Popover>
      <Popover
        withArrow
        trapFocus
        open={open === 'third'}
        onOpenChange={(_, data) => setOpen(data.open ? 'third' : undefined)}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton aria-label="Insert Formula" icon={<MathFormatLinear24Regular />} />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Insert Formula</h3>
            <Button onClick={() => setOpen(undefined)}>Close</Button>
          </div>
        </PopoverSurface>
      </Popover>
      <ToolbarDivider />
      <Popover
        withArrow
        trapFocus
        open={open === 'fourth'}
        onOpenChange={(_, data) => setOpen(data.open ? 'fourth' : undefined)}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton>Quick Actions</ToolbarButton>
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Quick Actions</h3>
            <Button onClick={() => setOpen(undefined)}>Close</Button>
          </div>
        </PopoverSurface>
      </Popover>
    </Toolbar>
  );
};
