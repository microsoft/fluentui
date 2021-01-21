import * as React from 'react';
import { MenuItem } from './MenuItem';
import { useMenuListContext } from './menuListContext';

export const MenuItemCheckbox = (props: any) => {
  const { checkedItems, onItemChecked, onItemUnChecked } = useMenuListContext();

  const checked = checkedItems.indexOf(props.value) > -1;
  const onClick = () => (checked ? onItemUnChecked(props.value) : onItemChecked(props.value));

  return (
    <MenuItem index={props.index} onClick={onClick}>
      {checked && <span>{String.fromCharCode(9989)}</span>}
      {props.children}
    </MenuItem>
  );
};
