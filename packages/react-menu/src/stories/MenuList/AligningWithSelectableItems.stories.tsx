import * as React from 'react';

import { MenuList, MenuItem, MenuItemCheckbox } from '../../index';
import { Container } from './Container';

import { CutIcon } from '../../tmp-icons.stories';

export const AligningWithSelectableItems = () => (
  <Container>
    <MenuList hasCheckmarks hasIcons>
      <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
        Checkbox item
      </MenuItemCheckbox>
      <MenuItem>Menu item</MenuItem>
      <MenuItem>Menu item</MenuItem>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
