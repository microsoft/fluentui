import * as React from 'react';
import { ChevronDown16Regular } from '@fluentui/react-icons';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuTriggerChildProps } from '@fluentui/react-menu';

// FIXME need to redeclare types since type import is under a @ts-ignore
type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

const buttonStyle = { height: 22, verticalAlign: 'middle' };

const CustomMenuTrigger = React.forwardRef<HTMLButtonElement, Partial<MenuTriggerChildProps>>((props, ref) => {
  return (
    <div>
      <button style={buttonStyle}>Custom Trigger</button>
      <button {...props} ref={ref} style={buttonStyle}>
        <ChevronDown16Regular />
      </button>
    </div>
  );
});

export const CustomInnerFunctionTrigger = () => {
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

CustomInnerFunctionTrigger.parameters = {
  docs: {
    description: {
      story: [
        'When a function component is passed as the children of `MenuTrigger`, the actual trigger can be customized to',
        'be an inner part of the component.',
        '',
        'These components should use ref forwarding with',
        '[React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)',
      ].join('\n'),
    },
  },
};
