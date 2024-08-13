import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import type { MenuProps, MenuTriggerChildProps } from '@fluentui/react-components';

const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, Partial<MenuTriggerChildProps>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <CustomMenuTrigger />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

CustomTrigger.parameters = {
  docs: {
    description: {
      story: [
        'Native elements and Fluent components have first class support as children of `MenuTrigger`',
        'so they will be injected automatically with the correct props for interactions and accessibility attributes.',
        '',
        'It is possible to use your own custom React component as a child of `MenuTrigger`. These components should',
        'use ref forwarding with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)',
      ].join('\n'),
    },
  },
};
