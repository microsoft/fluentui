import * as React from 'react';
import { MenuItem } from './MenuItem';
import { useMenuListContext } from './menuListContext';

export const MenuItemCheckbox = (props: any) => {
  const {
    checkedValues: { [props.name]: checkedItems = [] },
    onCheckedValuesChange,
  } = useMenuListContext();
  const { value, name } = props;

  const checked = checkedItems.indexOf(value) !== -1;
  const checkItem = () => [...checkedItems, value];
  const unCheckItem = () => {
    const newCheckedItems = [...checkedItems];
    const index = checkedItems.indexOf(value);
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
    }

    return newCheckedItems;
  };

  const onClick = () =>
    !checked ? onCheckedValuesChange(name, checkItem()) : onCheckedValuesChange(name, unCheckItem());

  return (
    <MenuItem index={props.index} onClick={onClick}>
      {checked && <span>{String.fromCharCode(9989)}</span>}
      {props.children}
    </MenuItem>
  );
};
