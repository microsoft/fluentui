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
import { select } from '@storybook/addon-knobs';

import { Button } from '@fluentui/react-button';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon, MoreIcon } from '@fluentui/react-icons-mdl2';
import { makeStyles } from '@fluentui/react-make-styles';

export const MenuExample = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
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
    <Menu open={open}>
      <MenuTrigger>
        <Button onClick={() => setOpen(s => !s)}>Toggle menu</Button>
      </MenuTrigger>

      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
      </MenuList>
    </Menu>
  );
};

const useCenteredStyles = makeStyles([[null, () => ({ position: 'fixed', top: '50%', left: '50%' })]]);
export const MenuPositionExample = () => {
  const position = select('position', ['above', 'below', 'before', 'after'], 'below');
  const align = select('align', ['top', 'bottom', 'start', 'end', 'center'], 'start');
  const className = useCenteredStyles({});

  return (
    <Menu position={position} align={align}>
      <MenuTrigger>
        <Button iconOnly icon={<MoreIcon />} className={className} />
      </MenuTrigger>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const MenuSelectionExample = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
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
