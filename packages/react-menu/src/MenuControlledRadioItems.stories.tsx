import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItemRadio, MenuPopover } from './index';

import { Button } from './utils.stories';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
} from '@fluentui/react-icons';
import type { MenuProps } from './index';

export const ControlledRadioItems = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ checkbox: ['2'] });
  const onChange: MenuProps['onCheckedValueChange'] = (e: React.SyntheticEvent, { name, checkedItems }) => {
    setCheckedValues(s => ({ ...s, [name]: checkedItems }));
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
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
      </MenuPopover>
    </Menu>
  );
};
