import * as React from 'react';
import { Tree, treeAsListBehavior } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-as-list-item-1',
    title: 'House Lannister',
    items: [
      {
        id: 'tree-as-list-item-11',
        title: 'Tywin',
        items: [
          {
            id: 'tree-as-list-item-111',
            title: 'Jaime',
          },
          {
            id: 'tree-as-list-item-112',
            title: 'Cersei',
          },
          {
            id: 'tree-as-list-item-113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: 'tree-as-list-item-12',
        title: 'Kevan',
        items: [
          {
            id: 'tree-as-list-item-121',
            title: 'Lancel',
          },
          {
            id: 'tree-as-list-item-122',
            title: 'Willem',
          },
          {
            id: 'tree-as-list-item-123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-as-list-item-2',
    title: 'House Targaryen',
    items: [
      {
        id: 'tree-as-list-item-21',
        title: 'Aerys',
        items: [
          {
            id: 'tree-as-list-item-211',
            title: 'Rhaegar',
          },
          {
            id: 'tree-as-list-item-212',
            title: 'Viserys',
          },
          {
            id: 'tree-as-list-item-213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
];

const TreeAsListExampleShorthand = () => (
  <Tree
    items={items}
    aria-label="Tree with list accessibility roles"
    aria-aria-multiselectable="true"
    accessibility={treeAsListBehavior}
    selectable
  />
);

export default TreeAsListExampleShorthand;
