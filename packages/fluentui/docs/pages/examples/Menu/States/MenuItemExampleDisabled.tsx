import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuItemExampleDisabled = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item index={0}>
      <Menu.ItemContent>Item #1</Menu.ItemContent>
    </Menu.Item>
    <Menu.Item index={1} disabled>
      <Menu.ItemContent>Disabled item</Menu.ItemContent>
    </Menu.Item>
    <Menu.Item index={2}>
      <Menu.ItemContent>Item #3</Menu.ItemContent>
    </Menu.Item>
  </Menu>
);

export default MenuItemExampleDisabled;
