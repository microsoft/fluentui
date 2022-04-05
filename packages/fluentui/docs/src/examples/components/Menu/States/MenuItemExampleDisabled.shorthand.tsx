import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'item1', content: 'Item #1' },
  { key: 'item2', content: 'Disabled item', disabled: true },
  { key: 'item3', content: 'Item #3' },
];

const MenuItemExampleDisabled = () => <Menu defaultActiveIndex={0} items={items} />;

export default MenuItemExampleDisabled;
