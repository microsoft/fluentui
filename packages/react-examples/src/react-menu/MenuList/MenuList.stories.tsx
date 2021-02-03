import * as React from 'react';

import {
  MenuList,
  MenuItem,
  FocusAbilityContextProvider,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuItemRadio,
} from '@fluentui/react-menu';

export const MenuListExample = () => (
  <FocusAbilityContextProvider>
    <MenuList>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuList>
  </FocusAbilityContextProvider>
);

export const MenuListWithIconsExample = () => (
  <FocusAbilityContextProvider>
    <MenuList>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
    </MenuList>
  </FocusAbilityContextProvider>
);

export const MenuListWithGroupExample = () => (
  <FocusAbilityContextProvider>
    <MenuList>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
      <MenuGroup>
        <MenuGroupHeader>Header</MenuGroupHeader>
        <MenuItem icon="X">Item</MenuItem>
        <MenuItem icon="X">Item</MenuItem>
        <MenuItem icon="X">Item</MenuItem>
      </MenuGroup>
    </MenuList>
  </FocusAbilityContextProvider>
);

export const MenuListWithCheckboxes = () => {
  const checkmark = <span>{String.fromCharCode(9989)}</span>;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FocusAbilityContextProvider>
      <MenuList checkedValues={checkedValues} onCheckedValuesChange={onChange}>
        <MenuItemCheckbox name="checkbox" value="1" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
        <MenuItemCheckbox name="checkbox" value="2" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
        <MenuItemCheckbox name="checkbox" value="3" checkmark={checkmark}>
          Item
        </MenuItemCheckbox>
      </MenuList>
    </FocusAbilityContextProvider>
  );
};

export const MenuListWithRadios = () => {
  const checkmark = <span>{String.fromCharCode(9989)}</span>;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FocusAbilityContextProvider>
      <MenuList checkedValues={checkedValues} onCheckedValuesChange={onChange}>
        <MenuItemRadio name="checkbox" value="1" checkmark={checkmark}>
          Item
        </MenuItemRadio>
        <MenuItemRadio name="checkbox" value="2" checkmark={checkmark}>
          Item
        </MenuItemRadio>
        <MenuItemRadio name="checkbox" value="3" checkmark={checkmark}>
          Item
        </MenuItemRadio>
      </MenuList>
    </FocusAbilityContextProvider>
  );
};
