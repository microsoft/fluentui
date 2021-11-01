import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuList, MenuItem, MenuPopover, MenuProps } from '@fluentui/react-menu';

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

export const AnchorToCustomTarget = () => {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const onOpenChange = (e: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  return (
    <>
      <Button ref={setTarget} onClick={() => setOpen(s => !s)}>
        Open menu
      </Button>
      <Button ref={setTarget} onClick={() => setOpen(s => !s)}>
        Custom target
      </Button>
      <Menu open={open} onOpenChange={onOpenChange} positioning={{ target }}>
        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

AnchorToCustomTarget.parameters = {
  docs: {
    description: {
      story: [
        'A Menu can be used without a trigger and anchored to any DOM element. This can be useful if',
        'a Menu instance needs to be reused in different places.',
        '',
        '_Not using a MenuTrigger will require more work to make sure your scenario is accessible_',
        '_such as implementing accessible markup and keyboard interactions for your trigger_',
      ].join('\n'),
    },
  },
};
