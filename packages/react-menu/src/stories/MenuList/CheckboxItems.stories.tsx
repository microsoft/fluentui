import * as React from 'react';

import { MenuList, MenuItemCheckbox, MenuListProps } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const CheckboxItems = (props: { defaultCheckedValues?: MenuListProps['defaultCheckedValues'] }) => {
  return (
    <Container>
      <MenuList defaultCheckedValues={props.defaultCheckedValues}>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </Container>
  );
};

export default {
  title: 'Components/MenuList',
  component: MenuList,
};
