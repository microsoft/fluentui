import * as React from 'react';
import { Tree, treeAsListboxBehavior } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-as-list-item-1',
    title: 'House Lannister',
    items: [
      {
        id: 'tree-as-list-item-11',
        title: 'Tywin',
        selectable: true,
      },
      {
        id: 'tree-as-list-item-12',
        title: 'Kevan',
        selectable: true,
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
            selectable: true,
          },
          {
            id: 'tree-as-list-item-212',
            title: 'Viserys',
            selectable: true,
          },
          {
            id: 'tree-as-list-item-213',
            title: 'Daenerys',
            selectable: true,
          },
        ],
      },
    ],
  },
];

const TreeMultiselectAsListExample = () => (
  <Tree
    defaultSelectedItemIds={['tree-item-122', 'tree-item-123']}
    selectable
    aria-label="Multi Select Tree as list"
    items={items}
    accessibility={treeAsListboxBehavior}
  />
);

export default TreeMultiselectAsListExample;
