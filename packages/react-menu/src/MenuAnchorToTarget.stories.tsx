import * as React from 'react';
import { Menu, MenuList, MenuItem, MenuPopover } from './index';

import { Button } from '@fluentui/react-button';
import type { MenuProps } from './index';

export const AnchorToCustomTarget = () => {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
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
        'A Menu can be used without a trigger and anchored to a any DOM element. This can be useful if',
        'a Menu instance needs to be reused in different places.',
        '',
        '_Not using a MenuTrigger will require more work to make sure your scenario is accessible_',
        '_such as implementing accessible markup and keyboard interactions for your trigger_',
      ].join('\n'),
    },
  },
};
