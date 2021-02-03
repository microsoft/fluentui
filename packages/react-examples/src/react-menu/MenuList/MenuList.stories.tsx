import * as React from 'react';

import { MenuList, MenuItem, MenuGroup, MenuGroupHeader, MenuItemCheckbox, MenuItemRadio } from '@fluentui/react-menu';
import { teamsLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from '@fluentui/react-icons-mdl2';

export const MenuListExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Item</MenuItem>
      <MenuItem icon={<PasteIcon />}>Item</MenuItem>
      <MenuItem icon={<EditIcon />}>Item</MenuItem>
    </MenuList>
  </FluentProvider>
);

export const MenuListWithIconsExample = () => (
  <FluentProvider theme={teamsLightTheme}>
    <MenuList>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
    </MenuList>
  </FluentProvider>
);

export const MenuListWithGroupExample = () => (
  <FluentProvider theme={teamsLightTheme}>
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
  </FluentProvider>
);

export const MenuListWithCheckboxes = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FluentProvider theme={teamsLightTheme}>
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
    </FluentProvider>
  );
};

export const MenuListWithRadios = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <FluentProvider theme={teamsLightTheme}>
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
    </FluentProvider>
  );
};
