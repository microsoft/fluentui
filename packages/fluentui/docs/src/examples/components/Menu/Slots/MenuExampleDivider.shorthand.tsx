import * as React from 'react';
import { Menu, MenuShorthandKinds } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'divider-1', kind: 'divider' as MenuShorthandKinds },
  { key: 'review', content: 'Reviews' },
  { key: 'divider-2', kind: 'divider' as MenuShorthandKinds, content: '...' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleKind = () => <Menu defaultActiveIndex={0} items={items} vertical pointing="start" />;

export default MenuExampleKind;
