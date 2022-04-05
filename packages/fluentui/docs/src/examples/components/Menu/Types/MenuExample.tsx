import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuExample = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item index={0}>
      <Menu.ItemContent>Editorials</Menu.ItemContent>
    </Menu.Item>
    <Menu.Item index={1}>
      <Menu.ItemContent>Reviews</Menu.ItemContent>
    </Menu.Item>
    <Menu.Item index={2}>
      <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
    </Menu.Item>
  </Menu>
);

export default MenuExample;
