import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExamplePointing = () => (
  <div>
    <Menu defaultActiveIndex={2} pointing primary>
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
    <br />
    <Menu defaultActiveIndex={0} items={items} pointing="start" primary />
  </div>
);
export default MenuExamplePointing;
