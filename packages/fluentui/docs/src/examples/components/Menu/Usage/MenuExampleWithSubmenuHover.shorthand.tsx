import * as React from 'react';
import { Menu, MenuProps } from '@fluentui/react-northstar';

const items: MenuProps['items'] = [
  {
    key: 'editorials',
    content: 'Editorials',
    menu: {
      items: [
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
          on: 'hover',
          menu: [
            { key: '1', content: 'item2.1' },
            { key: '2', content: 'item2.2' },
          ],
        },
        {
          key: '3',
          content: 'item3',
          on: 'hover',
          menu: [
            { key: '1', content: 'item3.1' },
            { key: '2', content: 'item3.2' },
          ],
        },
      ],
    },
  },
];

const MenuExampleWithSubMenuHover = () => <Menu defaultActiveIndex={0} items={items} />;

export default MenuExampleWithSubMenuHover;
