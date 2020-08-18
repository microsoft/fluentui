import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'divider-1', kind: 'divider' as const },
  { key: 'review', content: 'Reviews' },
  { key: 'divider-2', kind: 'divider' as const, content: '...' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleKind = () => <Menu defaultActiveIndex={0} items={items} vertical pointing="start" />;

export default MenuExampleKind;
