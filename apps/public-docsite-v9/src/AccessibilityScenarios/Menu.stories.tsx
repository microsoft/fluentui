import * as React from 'react';

import { Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';

import { Scenario } from './utils';

export const ProfileMenu: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Profile menu">
      <h1>Test 2</h1>
      <div>Dual State Interaction (Independent Hover + Focus) </div>
      <Menu positioning={{ autoSize: true }}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Pick a fruit</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Apricot</MenuItem>
            <MenuItem>Avocado</MenuItem>
            <MenuItem>Banana</MenuItem>

            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem>Berries</MenuItem>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>Blackberry</MenuItem>
                  <MenuItem>Boysenberry</MenuItem>
                  <MenuItem>Blueberry</MenuItem>
                  <MenuItem>Strawberry</MenuItem>
                  <MenuItem>Rapsberry</MenuItem>
                  <MenuItem>Barry White</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>

            <MenuItem>Cantaloupe</MenuItem>
            <MenuItem>Coconut</MenuItem>
            <MenuItem>Currant</MenuItem>
            <MenuItem>Dragon Fruit</MenuItem>
            <MenuItem>Grape</MenuItem>
            <MenuItem>Grapefruit</MenuItem>
            <MenuItem>Honeydew</MenuItem>
            <MenuItem>Kiwi</MenuItem>
            <MenuItem>Lemon</MenuItem>
            <MenuItem>Lime</MenuItem>
            <MenuItem>Lychee</MenuItem>
            <MenuItem>Mango</MenuItem>
            <MenuItem>Mandarin Orange</MenuItem>
            <MenuItem>Melon</MenuItem>
            <MenuItem>Nectarine</MenuItem>
            <MenuItem>Olive</MenuItem>
            <MenuItem>Orange</MenuItem>
            <MenuItem>Papaya</MenuItem>
            <MenuItem>Passion Fruit</MenuItem>
            <MenuItem>Peach</MenuItem>
            <MenuItem>Pear</MenuItem>
            <MenuItem>Persimmon</MenuItem>
            <MenuItem>Pineapple</MenuItem>
            <MenuItem>Plum</MenuItem>
            <MenuItem>Pomegranate</MenuItem>
            <MenuItem>Raspberry</MenuItem>
            <MenuItem>Rambutan</MenuItem>
            <MenuItem>Strawberry</MenuItem>
            <MenuItem>Watermelon</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Scenario>
  );
};
