import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { bundleIcon, ClipboardPasteRegular, ClipboardPasteFilled } from '@fluentui/react-icons';

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);

export const AligningWithIcons = () => (
  <Menu hasIcons>
    <MenuTrigger disableButtonEnhancement>
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
