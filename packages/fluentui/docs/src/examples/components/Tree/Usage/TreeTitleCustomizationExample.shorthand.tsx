import * as React from 'react'
import { Icon, Tree } from '@fluentui/react'

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
            title: 'one one one',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'two',
    items: [
      {
        id: '5',
        title: 'two one',
      },
    ],
  },
]

const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
  <Component open={open} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && <Icon name={open ? 'triangle-down' : 'triangle-right'} />}
    <span>{content}</span>
  </Component>
)

const TreeTitleCustomizationExample = () => (
  <Tree aria-label="Custom title" items={items} renderItemTitle={titleRenderer} />
)

export default TreeTitleCustomizationExample
