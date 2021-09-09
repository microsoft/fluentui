import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuTriggerChildProps } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

// FIXME need to redeclare types since type import is under a @ts-ignore
type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, Partial<MenuTriggerChildProps>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
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
