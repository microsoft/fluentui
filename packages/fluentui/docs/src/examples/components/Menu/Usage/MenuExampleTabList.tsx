import * as React from 'react';
import { Menu, tabListBehavior } from '@fluentui/react-northstar';

const MenuExampleTabShorthand = props => (
  <Menu defaultActiveIndex={0} underlined primary accessibility={tabListBehavior} aria-label="Today's events">
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

export default MenuExampleTabShorthand;
