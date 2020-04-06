import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'افتتاحيات' },
  { key: 'review', content: 'التعليقات' },
  { key: 'events', content: 'الأحداث القادمة' },
];

const MenuExample = () => <Menu defaultActiveIndex={0} items={items} />;

export default MenuExample;
