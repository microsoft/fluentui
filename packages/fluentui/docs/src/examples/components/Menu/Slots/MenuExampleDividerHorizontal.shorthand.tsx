import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { TriangleEndIcon } from '@fluentui/react-icons-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  {
    key: 'divider-1',
    kind: 'divider' as const,
    content: '▸',
  },
  { key: 'review', content: 'Reviews' },
  {
    key: 'divider-2',
    kind: 'divider' as const,
    content: <TriangleEndIcon />,
  },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleKind = () => <Menu defaultActiveIndex={0} items={items} underlined />;

export default MenuExampleKind;
