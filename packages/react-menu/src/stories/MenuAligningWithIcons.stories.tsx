import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { ClipboardPaste20Regular as PasteIcon } from '@fluentui/react-icons';

export const AligningWithIcons = () => (
  <Menu hasIcons>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

AligningWithIcons.parameters = {
  docs: {
    description: {
      story: [
        'The `hasIcons` prop will align menu items if only a subset of menu items contain an icon.',
        'When separation of menu items is only for visual aesthetics, the `MenuDivider` component can be used',
        'by itself as it has no accessible markup features.',
      ].join('\n'),
    },
  },
};
