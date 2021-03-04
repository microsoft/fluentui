import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuItemRadio,
  MenuItemCheckbox,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
} from '@fluentui/react-menu';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '@fluentui/react-icons-mdl2';

export const MenuExample = () => (
  <>
    <Menu>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
      </MenuList>
    </Menu>
  </>
);

export const MenuControlledExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Menu open={open} setOpen={setOpen}>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuList>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 1</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export const MenuSelectionExample = () => (
  <>
    <Menu>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut" checkmark={<AcceptIcon />}>
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste" checkmark={<AcceptIcon />}>
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit" checkmark={<AcceptIcon />}>
            Edit
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio icon={<CutIcon />} name="font" value="segoe" checkmark={<AcceptIcon />}>
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri" checkmark={<AcceptIcon />}>
            Caliri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditIcon />} name="font" value="arial" checkmark={<AcceptIcon />}>
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </Menu>
  </>
);
