import * as React from 'react'
import { Tree } from '@fluentui/react'

const items = [
  {
    id: '1',
    title: 'House Lannister',
    items: [
      {
        id: '11',
        title: 'Tywin',
        items: [
          {
            id: '111',
            title: 'Jaime',
          },
          {
            id: '112',
            title: 'Cersei',
          },
          {
            id: '113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: '12',
        title: 'Kevan',
        items: [
          {
            id: '121',
            title: 'Lancel',
          },
          {
            id: '122',
            title: 'Willem',
          },
          {
            id: '123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'House Targaryen',
    items: [
      {
        id: '21',
        title: 'Aerys',
        items: [
          {
            id: '211',
            title: 'Rhaegar',
          },
          {
            id: '212',
            title: 'Viserys',
          },
          {
            id: '213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const TreeExampleShorthand = () => <Tree aria-label="default" items={items} />

export default TreeExampleShorthand
