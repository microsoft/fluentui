import * as React from 'react';
import { Tree, treeAsListboxBehavior } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-as-list-item-1',
    title: 'House Lannister',
    'aria-label': 'House Lannister, expandable',
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
    'aria-label': 'House Targaryen, expandable',
    selectableParent: true,
    items: [
      {
        id: 'tree-as-list-item-21',
        title: 'Aerys',
        'aria-label': 'Aerys, expandable',
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
  <Tree selectable aria-label="Multi Select Tree as list" items={items} accessibility={treeAsListboxBehavior} />
);

export default TreeMultiselectAsListExample;
