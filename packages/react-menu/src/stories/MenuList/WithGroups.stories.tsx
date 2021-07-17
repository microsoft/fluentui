import * as React from 'react';

import { MenuList, MenuItem, MenuGroup, MenuDivider, MenuGroupHeader } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const WithGroups = () => (
  <Container>
    <MenuList>
      <MenuGroup>
        <MenuGroupHeader>Section header</MenuGroupHeader>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuGroupHeader>Section header</MenuGroupHeader>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuGroup>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
