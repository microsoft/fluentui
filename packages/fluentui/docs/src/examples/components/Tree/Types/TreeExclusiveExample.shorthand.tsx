import * as React from 'react';
import { Tree } from '@fluentui/react';

const items = [
  {
    id: '1',
    title: 'one',
    items: [
      {
        id: '2',
        title: 'one one',
        items: [
          {
            id: '3',
            title: 'one one one'
          }
        ]
      },
      {
        id: '6',
        title: 'one two',
        items: [
          {
            id: '7',
            title: 'one two one'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'two',
    items: [
      {
        id: '5',
        title: 'two one'
      }
    ]
  }
];

const TreeExclusiveExample = () => <Tree aria-label="exclusive" items={items} exclusive />;

export default TreeExclusiveExample;
