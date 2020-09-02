import * as React from 'react';
import { Menu, Tooltip } from '@fluentui/react-northstar';

const MenuExampleWithTooltip = () => (
  <Menu defaultActiveIndex={0}>
    <Tooltip content="Click for opening Editorials">
      <Menu.Item index={0}>
        <Menu.ItemContent>Editorials</Menu.ItemContent>
      </Menu.Item>
    </Tooltip>
    <Tooltip content="Click for opening Reviews">
      <Menu.Item index={1}>
        <Menu.ItemContent>Reviews</Menu.ItemContent>
      </Menu.Item>
    </Tooltip>
    <Tooltip content="Click for opening Upcoming Events">
      <Menu.Item index={2}>
        <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
      </Menu.Item>
    </Tooltip>
  </Menu>
);

export default MenuExampleWithTooltip;
