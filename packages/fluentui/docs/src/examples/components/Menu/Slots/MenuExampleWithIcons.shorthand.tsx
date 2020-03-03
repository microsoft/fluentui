import * as React from 'react';
import { Menu } from '@fluentui/react';

const items = [
  { key: 'onedrive', icon: 'onedrive' },
  { key: 'star', icon: 'star' },
  { key: 'search', icon: 'search' }
];

const MenuExampleWithIcons = () => <Menu defaultActiveIndex={0} items={items} />;

export default MenuExampleWithIcons;
