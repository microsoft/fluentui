import * as React from 'react';
import { MenuItem } from './MenuItem';
import { useMenuListContext } from './menuListContext';

export const MenuItemRadio = (props: any) => {
  const { name, value } = props;
  const {
    checkedValues: { [name]: checkedItems = [] },
    onCheckedValuesChange,
  } = useMenuListContext();

  const checked = checkedItems[0] === value;

  const onClick = () => {
    if (checked) return;
    onCheckedValuesChange(name, [value]);
  };

  return (
    <MenuItem index={props.index} onClick={onClick}>
      {checked && <span>{String.fromCharCode(9989)}</span>}
      {props.children}
    </MenuItem>
  );
};
