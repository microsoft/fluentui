import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody } from '@fluentui/react-dialog';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import story from './DialogTitleCustomAction.md';
import { MoreVertical24Filled } from '@fluentui/react-icons';

export const CustomAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle
          action={
            <Menu>
              <MenuTrigger>
                <Button aria-label="more" icon={<MoreVertical24Filled />} />
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
          }
        >
          Dialog title
        </DialogTitle>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

CustomAction.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
