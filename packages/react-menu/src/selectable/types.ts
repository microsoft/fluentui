export interface MenuItemSelectableProps {
  name: string;

  value: string;
}

export interface MenuItemSelectableState {
  checkedItems: string[];

  onCheckedValuesChange: (name: string, value: string[]) => void;

  checked: boolean;
}
