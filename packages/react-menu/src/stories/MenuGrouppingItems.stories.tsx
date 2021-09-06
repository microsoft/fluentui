import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuPopover,
} from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
} from '@fluentui/react-icons';

export const GrouppingItems = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);

GrouppingItems.parameters = {
  docs: {
    description: {
      story: [
        'A menu can be divided in to separate groups, using the `MenuGroup` and `MenuGroupHeader`',
        'components ensures correct accessible markdown screen reader users',
      ].join('\n'),
    },
  },
};
