import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItemRadio,
  MenuItemCheckbox,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuPopover,
} from '../../index';

import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '../../tmp-icons.stories';

export const SelectionGroup = () => (
  <Menu>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox
            secondaryContent="Ctrl+N"
            icon={<CutIcon />}
            name="edit"
            value="cut"
            checkmark={<AcceptIcon />}
          >
            Show Menu Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox
            secondaryContent="Ctrl+Shift+N"
            icon={<PasteIcon />}
            name="edit"
            value="paste"
            checkmark={<AcceptIcon />}
          >
            Show Side Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox
            secondaryContent="Ctrl+Shift+O"
            icon={<EditIcon />}
            name="edit"
            value="edit"
            checkmark={<AcceptIcon />}
          >
            Show Status Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox disabled icon={<EditIcon />} name="disabled" value="disabled" checkmark={<AcceptIcon />}>
            Show Debug Panel
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio
            secondaryContent="Ctrl+N"
            icon={<CutIcon />}
            name="font"
            value="segoe"
            checkmark={<AcceptIcon />}
          >
            Segoe
          </MenuItemRadio>
          <MenuItemRadio
            secondaryContent="Ctrl+Shift+N"
            icon={<PasteIcon />}
            name="font"
            value="calibri"
            checkmark={<AcceptIcon />}
          >
            Caliri
          </MenuItemRadio>
          <MenuItemRadio
            secondaryContent="Ctrl+Shift+N"
            icon={<EditIcon />}
            name="font"
            value="arial"
            checkmark={<AcceptIcon />}
          >
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);

export default {
  title: 'Components/Menu',
  component: Menu,
};
