import * as React from 'react';
import { MenuList, MenuItem, MenuPopover, MenuTrigger, Menu, Button } from '@fluentui/react-components';
import {
  EditRegular,
  EditFilled,
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
} from '@fluentui/react-icons';

const EditIcon = bundleIcon(EditFilled, EditRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);

export const MultilineItems = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Multiline items</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem subText="Cut to clipboard" icon={<CutIcon />}>
            Cut
          </MenuItem>
          <MenuItem subText="Paste from clipboard" icon={<PasteIcon />}>
            Paste
          </MenuItem>
          <MenuItem subText="Edit file" icon={<EditIcon />}>
            Edit
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
