import * as React from 'react';
import { HierarchicalTree } from '@fluentui/react-northstar';

const items = [
  {
    key: '1',
    title: 'one',
    items: [
      {
        key: '2',
        title: 'one one',
        items: [
          {
            key: '3',
            title: 'one one one',
          },
        ],
      },
      {
        key: '6',
        title: 'one two',
        items: [
          {
            key: '7',
            title: 'one two one',
          },
        ],
      },
    ],
  },
  {
    key: '4',
    title: 'two',
    items: [
      {
        key: '5',
        title: 'two one',
      },
    ],
  },
];

const TreeExclusiveExample = () => <HierarchicalTree items={items} exclusive />;

export default TreeExclusiveExample;
