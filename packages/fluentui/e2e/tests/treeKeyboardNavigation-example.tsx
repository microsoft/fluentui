import React from 'react';
import { Tree } from '@fluentui/react-northstar';

const items = [
  {
    id: 'lannister',
    title: 'House Lannister',
    items: [
      {
        id: 'twyin',
        title: 'Tywin',
        items: [
          {
            id: 'jaime',
            title: 'Jaime',
          },
          {
            id: 'cersei',
            title: 'cersei',
          },
          {
            id: 'tyrion',
            title: 'тирион',
          },
        ],
      },
      {
        id: 'tree-item-12',
        title: 'Kevan',
        items: [
          {
            id: 'tree-item-121',
            title: 'Lancel',
          },
        ],
      },
    ],
  },
];

const TreeKeyboardNavigation = () => <Tree aria-label="default" items={items} />;

export default TreeKeyboardNavigation;
