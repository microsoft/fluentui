import * as React from 'react';
import { Menu, MenuList, MenuItem, MenuProps, MenuPopover } from '../../index';

export const CustomTarget = () => {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  return (
    <>
      <button ref={setTarget} onClick={() => setOpen(s => !s)}>
        Custom Target
      </button>
      <Menu open={open} onOpenChange={onOpenChange} target={target}>
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

export default {
  title: 'Components/Menu',
  component: Menu,
};
