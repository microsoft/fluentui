import * as React from 'react';

import { MenuList, MenuItemCheckbox } from '../../index';
import { Container } from './Container';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const CheckboxItemsControlled = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (e: React.SyntheticEvent, name: string, items: string[]) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: items } : { [name]: items };
    });
  };

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
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
