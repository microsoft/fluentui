import * as React from 'react';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';
import { Popover, PopoverSurface, PopoverTrigger, Button } from '@fluentui/react-components';
import { MathFormatLinear24Regular, Image24Regular, Table24Filled } from '@fluentui/react-icons';

export const WithPopover = (props: Partial<ToolbarProps>) => {
  const [open, setOpen] = React.useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  return (
    <Toolbar {...props} size="small">
      <Popover
        withArrow
        trapFocus
        open={open.first}
        onOpenChange={() => {
          setOpen(currOpen => ({
            ...currOpen,
            first: !currOpen.first,
          }));
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton appearance="primary" icon={<Table24Filled />} aria-label="Insert Table" />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Popover content</h3>
            <Button
              onClick={() =>
                setOpen(currOpen => ({
                  ...currOpen,
                  first: false,
                }))
              }
            >
              Close
            </Button>
          </div>
        </PopoverSurface>
      </Popover>
      <Popover
        withArrow
        trapFocus
        open={open.second}
        onOpenChange={() => {
          setOpen(currOpen => ({
            ...currOpen,
            second: !currOpen.second,
          }));
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton aria-label="Inser image" icon={<Image24Regular />} />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Popover content</h3>
            <Button
              onClick={() =>
                setOpen(currOpen => ({
                  ...currOpen,
                  second: false,
                }))
              }
            >
              Close
            </Button>
          </div>
        </PopoverSurface>
      </Popover>
      <Popover
        withArrow
        trapFocus
        open={open.third}
        onOpenChange={() => {
          setOpen(currOpen => ({
            ...currOpen,
            third: !currOpen.third,
          }));
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton aria-label="Insert Formula" icon={<MathFormatLinear24Regular />} />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Popover content - Formula</h3>{' '}
            <Button
              onClick={() =>
                setOpen(currOpen => ({
                  ...currOpen,
                  third: false,
                }))
              }
            >
              Close
            </Button>
          </div>
        </PopoverSurface>
      </Popover>
      <ToolbarDivider />
      <Popover
        withArrow
        trapFocus
        open={open.fourth}
        onOpenChange={() => {
          setOpen(currOpen => ({
            ...currOpen,
            fourth: !currOpen.third,
          }));
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <ToolbarButton>Quick Actions</ToolbarButton>
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <h3>Popover content - Quick Actions</h3>{' '}
            <Button
              onClick={() =>
                setOpen(currOpen => ({
                  ...currOpen,
                  fourth: false,
                }))
              }
            >
              Close
            </Button>
          </div>
        </PopoverSurface>
      </Popover>
    </Toolbar>
  );
};
