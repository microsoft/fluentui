import * as React from 'react';

import { MenuList, MenuItem } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const WithIcons = () => (
  <Container>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
