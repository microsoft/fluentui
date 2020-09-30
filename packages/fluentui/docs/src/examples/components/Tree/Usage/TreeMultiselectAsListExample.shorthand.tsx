import * as React from 'react';
import { Tree, treeAsListboxBehavior } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-as-list-item-1',
    title: 'House Lannister',
    selectableParent: true,
    items: [
      {
        id: 'tree-as-list-item-11',
        title: 'Tywin',
      },
      {
        id: 'tree-as-list-item-12',
        title: 'Kevan',
      },
    ],
  },
  {
    id: 'tree-as-list-item-2',
    title: 'House Targaryen',
    selectableParent: true,
    items: [
      {
        id: 'tree-as-list-item-21',
        title: 'Aerys',
        selectableParent: true,
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
