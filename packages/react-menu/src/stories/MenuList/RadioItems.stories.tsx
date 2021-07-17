import * as React from 'react';

import { MenuList, MenuItemRadio } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const RadioItems = () => {
  return (
    <Container>
      <MenuList>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </Container>
  );
};

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
