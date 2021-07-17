import * as React from 'react';

import { MenuList, MenuItem } from '../../index';
import { Container } from './Container';

export const ShortcutText = () => (
  <Container>
    <MenuList>
      <MenuItem secondaryContent="Ctrl+N">New File</MenuItem>
      <MenuItem secondaryContent="Ctrl+Shift+N">New Window</MenuItem>
      <MenuItem secondaryContent="Ctrl+O">Open File</MenuItem>
    </MenuList>
  </Container>
);

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
