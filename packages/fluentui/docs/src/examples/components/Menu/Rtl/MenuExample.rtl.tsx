import * as React from 'react';
import { Menu, Provider } from '@fluentui/react-northstar';

const items = [
  {
    key: 'editorials',
    content: 'افتتاحيات',
    menu: {
      items: [
        {
          key: 'events1',
          content: 'الأحداث القادمة',
        },
      ],
    },
  },
  { key: 'review', content: 'التعليقات' },
  { key: 'events', content: 'الأحداث القادمة' },
];

const MenuExample = () => (
  <Provider rtl>
    <Menu defaultActiveIndex={0} items={items} />
    <Menu defaultActiveIndex={0} vertical items={items} />
  </Provider>
);

export default MenuExample;
