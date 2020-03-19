import * as React from 'react';
import { Tree } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-item-exclusive-1',
    title: 'one',
    items: [
      {
        id: 'tree-item-exclusive-2',
        title: 'one one',
        items: [
          {
            id: 'tree-item-exclusive-3',
            title: 'one one one',
          },
        ],
      },
      {
        id: 'tree-item-exclusive-6',
        title: 'one two',
        items: [
          {
            id: 'tree-item-exclusive-7',
            title: 'one two one',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-exclusive-4',
    title: 'two',
    items: [
      {
        id: 'tree-item-exclusive-5',
        title: 'two one',
      },
    ],
  },
];

const TreeExclusiveExample = () => <Tree aria-label="exclusive" items={items} exclusive />;

export default TreeExclusiveExample;
