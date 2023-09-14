import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuDivider, MenuPopover } from '@fluentui/react-components';

import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

export const VisualDividerOnly = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        <MenuDivider />
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

VisualDividerOnly.parameters = {
  docs: {
    description: {
      story: [
        'If a divider is needed only for visual aesthetics, the `MenuDivider` component can be used separately.',
        'When items should be logically groupped, use the `MenuGroup` and `MenuGroupHeader` components',
        'for correct accessible markup.',
      ].join('\n'),
    },
  },
};
