import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleUnderlined = () => <Menu defaultActiveIndex={0} items={items} underlined primary />;

export default MenuExampleUnderlined;
