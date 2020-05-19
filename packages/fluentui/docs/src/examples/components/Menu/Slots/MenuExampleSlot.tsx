import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuExample = () => (
  <Menu defaultActiveIndex={0} primary>
    <Menu.Item index={0} content="Editorials" />
    <Menu.Item index={1} content="Reviews" />
    <Menu.Item index={2} content="Upcoming Events" />
  </Menu>
);

export default MenuExample;
