import * as React from 'react';
import { Icon, Tree } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-title-customization-item-1',
    title: 'one',
    items: [
      {
        id: 'tree-title-customization-item-2',
        title: 'one one',
        items: [
          {
            id: 'tree-title-customization-item-3',
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-title-customization-item-4',
    title: 'two',
    items: [
      {
        id: 'tree-title-customization-item-5',
        title: 'two one',
      },
    ],
  },
];

const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
  <Component open={open} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && <Icon name={open ? 'triangle-down' : 'triangle-right'} />}
    <span>{content}</span>
  </Component>
);

const TreeTitleCustomizationExample = () => (
  <Tree aria-label="Custom title" items={items} renderItemTitle={titleRenderer} />
);

export default TreeTitleCustomizationExample;
