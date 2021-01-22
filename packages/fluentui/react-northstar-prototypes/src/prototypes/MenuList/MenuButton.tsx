import * as React from 'react';
import { MenuList } from './MenuList';
import { MenuItem } from './MenuItem';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';
import { MenuDivider } from './MenuDivider';
import { MenuSectionHeader } from './MenuSectionHeader';
import { MenuGroup } from './MenuGroup';
import { MenuItemCheckbox } from './MenuItemCheckbox';
import { MenuItemRadio } from './MenuItemRadio';

export function MenuButton() {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, number[]>>({});
  const onCheckedValuesChange = (checkedValues: Record<string, number[]>) => setCheckedValues(checkedValues);

  return (
    <>
      <div>
        Checked Items:{' '}
        {Object.keys(checkedValues).map(name => (
          <div key={name}>
            {name}: {checkedValues[name].map(item => `${item}, `)}
          </div>
        ))}
      </div>
      <Menu onCheckedValuesChange={onCheckedValuesChange}>
        <MenuTrigger>
          <div
            tabIndex={0}
            style={{
              border: '1px solid black',
              width: 55,
              textAlign: 'center',
            }}
          >
            Menu v
          </div>
        </MenuTrigger>
        <MenuList>
          <MenuItem index={1}>Item 1</MenuItem>
          <MenuItem index={2}>Item 2</MenuItem>
          <MenuItem index={3}>Item 3</MenuItem>
          <MenuItem index={4}>Item 4</MenuItem>
          <MenuDivider />
          <MenuGroup>
            <MenuSectionHeader>Checkbox group</MenuSectionHeader>
            <MenuItemCheckbox name="checkbox" value={1} index={6}>
              Check
            </MenuItemCheckbox>
            <MenuItemCheckbox name="checkbox" value={2} index={7}>
              Check
            </MenuItemCheckbox>
          </MenuGroup>
          <MenuGroup>
            <MenuSectionHeader>Checkbox group</MenuSectionHeader>
            <MenuItemRadio name="radio" value={3} index={8}>
              Radio
            </MenuItemRadio>
            <MenuItemRadio name="radio" value={4} index={9}>
              Radio
            </MenuItemRadio>
          </MenuGroup>
          <MenuDivider />
          <Menu>
            <MenuTrigger>
              <MenuItem index={5}>Item 5</MenuItem>
            </MenuTrigger>
            <MenuList>
              <MenuItem index={1}>item 1</MenuItem>
              <MenuItem index={2}>item 2</MenuItem>
              <Menu>
                <MenuTrigger>
                  <MenuItem index={3}>Item 3</MenuItem>
                </MenuTrigger>
                <MenuList>
                  <MenuItem index={1}>1</MenuItem>
                  <MenuItem index={2}>2</MenuItem>
                </MenuList>
              </Menu>
            </MenuList>
          </Menu>
        </MenuList>
      </Menu>
    </>
  );
}
