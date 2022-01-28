import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItemCheckbox, MenuPopover, MenuProps } from '../index';

import { Button } from '@fluentui/react-button';
import {
  CutRegular as CutIcon,
  ClipboardPasteRegular as PasteIcon,
  EditRegular as EditIcon,
} from '@fluentui/react-icons';

export const ControlledCheckboxItems = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>
      <MenuPopover>
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
      </MenuPopover>
    </Menu>
  );
};
