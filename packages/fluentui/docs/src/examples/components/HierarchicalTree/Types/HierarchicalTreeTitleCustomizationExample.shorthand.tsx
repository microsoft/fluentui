import * as React from 'react';
import { HierarchicalTree } from '@fluentui/react-northstar';
import { ArrowDownIcon, ArrowRightIcon } from '@fluentui/react-icons-northstar';

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

const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
  <Component open={open} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && open ? <ArrowDownIcon /> : <ArrowRightIcon />}
    <span>{content}</span>
  </Component>
);

const TreeTitleCustomizationExample = () => (
  <HierarchicalTree aria-label="Custom Title" items={items} renderItemTitle={titleRenderer} />
);

export default TreeTitleCustomizationExample;
