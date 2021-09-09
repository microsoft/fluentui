import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItemRadio, MenuPopover, MenuProps } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
} from '@fluentui/react-icons';

// FIXME need to redeclare types since type import is under a @ts-ignore
type OnCheckedValueChange = (
  e: React.MouseEvent | React.KeyboardEvent,
  data: {
    /** The name of the value */
    name: string;
    /** The items for this value that are checked */
    checkedItems: string[];
  },
) => void;

export const ControlledRadioItems = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ checkbox: ['2'] });
  const onChange: OnCheckedValueChange = (e: React.SyntheticEvent, { name, checkedItems }) => {
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
