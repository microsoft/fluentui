import * as React from 'react';
import { Menu, tabListBehavior } from '@fluentui/react-northstar';

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const MenuExampleTabShorthand: React.FC = props => (
  <Menu
    defaultActiveIndex={0}
    items={items}
    underlined
    primary
    accessibility={tabListBehavior}
    aria-label="Today's events"
  />
);

export default MenuExampleTabShorthand;
