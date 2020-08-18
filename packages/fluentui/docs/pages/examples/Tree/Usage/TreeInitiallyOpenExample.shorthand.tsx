import * as React from 'react';
import { Tree } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-initially-open-item-1',
    title: 'House Lannister',
    items: [
      {
        id: 'tree-initially-open-item-11',
        title: 'Tywin',
        items: [
          {
            id: 'tree-initially-open-item-111',
            title: 'Jaime',
          },
          {
            id: 'tree-initially-open-item-112',
            title: 'Cersei',
          },
          {
            id: 'tree-initially-open-item-113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: 'tree-initially-open-item-12',
        title: 'Kevan',
        items: [
          {
            id: 'tree-initially-open-item-121',
            title: 'Lancel',
          },
          {
            id: 'tree-initially-open-item-122',
            title: 'Willem',
          },
          {
            id: 'tree-initially-open-item-123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-initially-open-item-2',
    title: 'House Targaryen',
    items: [
      {
        id: 'tree-initially-open-item-21',
        title: 'Aerys',
        items: [
          {
            id: 'tree-initially-open-item-211',
            title: 'Rhaegar',
          },
          {
            id: 'tree-initially-open-item-212',
            title: 'Viserys',
          },
          {
            id: 'tree-initially-open-item-213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
];

const TreeInitiallyOpenExampleShorthand = () => (
  <Tree
    items={items}
    aria-label="Initially open"
    defaultActiveItemIds={['tree-initially-open-item-1', 'tree-initially-open-item-12', 'tree-initially-open-item-2']}
  />
);

export default TreeInitiallyOpenExampleShorthand;
