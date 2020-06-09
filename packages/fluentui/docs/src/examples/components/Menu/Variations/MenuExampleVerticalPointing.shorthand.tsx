import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleVerticalPointing = () => <Menu defaultActiveIndex={0} items={items} vertical pointing />;

export default MenuExampleVerticalPointing;
