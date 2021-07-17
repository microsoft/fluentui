import * as React from 'react';

import { MenuList, MenuItem, Menu, MenuPopover, MenuTrigger } from '../../index';
import { Container } from './Container';

export const NestedSubmenus = () => (
  <Container>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
      <Menu>
        <MenuTrigger>
          <MenuItem>Preferences</MenuItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Paste</MenuItem>
            <MenuItem>Edit</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
