import * as React from 'react';
import { Tree } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-item-1',
    title: 'House Lannister',
    items: [
      {
        id: 'tree-item-11',
        title: 'Tywin',
        items: [
          {
            id: '1',
            title: 'Jaime',
            items: [
              {
                id: '2',
                title: 'Jaime 2',
              },
              {
                id: '3',
                title: 'Jaime 3',
              },
            ],
          },
          {
            id: '4',
            title: 'Cersei',
          },
          {
            id: '5',
            title: 'Tyrion',
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
          {
            id: 'tree-item-122',
            title: 'Willem',
          },
          {
            id: 'tree-item-123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-2',
    title: 'House Targaryen',
    items: [
      {
        id: 'tree-item-21',
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-211',
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-212',
            title: 'Viserys',
          },
          {
            id: 'tree-item-213',
            title: 'Daenerys',
            selectable: false,
          },
        ],
      },
    ],
  },
  {
    id: '100',
    title: 'House Skywalker',
    items: [
      {
        id: '102',
        title: 'Leia',
      },
      {
        id: '103',
        title: 'Luke',
      },
      {
        id: '104',
        title: 'Rey',
        selectable: false,
      },
    ],
  },
];

const TreeMultiselectExample = () => (
  <Tree
    defaultSelectedItemIds={['tree-item-122', 'tree-item-123']}
    selectable
    aria-label="Multi Select"
    items={items}
  />
);

export default TreeMultiselectExample;
