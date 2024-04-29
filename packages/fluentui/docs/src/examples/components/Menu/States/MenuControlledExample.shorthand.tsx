import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'item1', content: 'Item #1' },
  { key: 'item2', content: 'Disabled item', disabled: true },
  {
    key: 'item3',
    content: 'Item #3',
    menuOpen: true,
    menu: [
      { key: 'item1', content: 'Item #1' },
      { key: 'item2', content: 'Disabled item', disabled: true },
    ],
  },
];

const MenuControlledExampleDisabled = () => <Menu items={items} activeIndex={2} />;

export default MenuControlledExampleDisabled;
