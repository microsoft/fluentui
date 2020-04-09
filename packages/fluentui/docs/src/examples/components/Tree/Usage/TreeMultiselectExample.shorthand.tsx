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
        selectableParent: true,
        selectionIndicator: {
          content: 'Select All',
        },
        items: [
          {
            id: 'tree-item-111',
            title: 'Jaime',
          },
          {
            id: 'tree-item-112',
            title: 'Cersei',
          },
          {
            id: 'tree-item-113',
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
];

const TreMultiselectExample = () => (
  <Tree defaultSelectedItemIds={['tree-item-122', 'tree-item-123']} selectable aria-label="default" items={items} />
);

export default TreMultiselectExample;
