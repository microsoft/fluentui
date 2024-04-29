import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExamplePointing = () => (
  <div>
    <Menu defaultActiveIndex={2} items={items} pointing primary />
    <br />
    <Menu defaultActiveIndex={0} items={items} pointing="start" primary />
  </div>
);
export default MenuExamplePointing;
