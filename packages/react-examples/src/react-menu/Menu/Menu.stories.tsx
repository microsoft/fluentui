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
  MenuProps,
} from '@fluentui/react-menu';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '@fluentui/react-icons-mdl2';
import { boolean } from '@storybook/addon-knobs';

export const MenuExample = (props: Pick<MenuProps, 'onHover' | 'onContext'>) => (
  <Menu onHover={props.onHover} onContext={props.onContext}>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuList>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 1</MenuItem>
    </MenuList>
  </Menu>
);

export const MenuControlledExample = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Menu open={open}>
        <MenuTrigger>
          <button onClick={() => setOpen(s => !s)}>Toggle menu</button>
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

export const MenuTriggerInteractions = () => {
  const context = boolean('context', false);
  const hover = boolean('hover', false);

  return <MenuExample onContext={context} onHover={hover} />;
};

export const MenuSelectionExample = () => (
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
);
