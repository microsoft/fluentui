import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuExampleSlot = () => (
  <Menu defaultActiveIndex={0} primary>
    <Menu.Item index={0}>Editorials</Menu.Item>
    <Menu.Item index={1}>Reviews</Menu.Item>
    <Menu.Item index={2}>Upcoming Events</Menu.Item>
  </Menu>
);

export default MenuExampleSlot;
