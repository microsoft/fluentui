import * as React from 'react';

import { MenuList, MenuItemCheckbox, MenuItemRadio, MenuGroup, MenuDivider, MenuGroupHeader } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const SelectionGroups = () => {
  return (
    <Container>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
            Edit
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
            Caliri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </Container>
  );
};

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
