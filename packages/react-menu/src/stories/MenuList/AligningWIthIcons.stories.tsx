import * as React from 'react';

import { MenuList, MenuItem } from '../../index';
import { Container } from './Container';

import { PasteIcon } from '../../tmp-icons.stories';

export const AligningWithIcons = () => (
  <Container>
    <MenuList hasIcons>
      <MenuItem>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
