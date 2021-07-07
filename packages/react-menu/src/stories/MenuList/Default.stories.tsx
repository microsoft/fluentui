import * as React from 'react';

import { MenuList, MenuItem } from '../../index';
import { Container } from './Container';

export const Default = () => (
  <Container>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
