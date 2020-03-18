import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    icon: {
      name: 'bookmark',
      outline: true
    }
  },
  {
    key: 'review',
    content: 'Reviews',
    icon: {
      name: 'word'
    }
  },
  { key: 'events', content: 'Upcoming Events' },
  {
    key: 'moreevents',
    content: 'View full calendar with content so long that it wraps',
    icon: {
      name: 'calendar'
    },
    menu: {
      items: [
        {
          key: '1',
          content: 'item1'
        },
        {
          key: '2',
          content: 'item2'
        },
        {
          key: '3',
          content: 'item3',
          menu: {
            items: [
              {
                key: '3.1',
                content: 'item3.1'
              }
            ]
          }
        }
      ]
    }
  }
];

const MenuExampleVertical = () => <Menu primary defaultActiveIndex={0} items={items} vertical />;

export default MenuExampleVertical;
