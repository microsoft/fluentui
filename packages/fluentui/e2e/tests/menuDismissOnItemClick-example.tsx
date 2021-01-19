import React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuDismissOnItemClick = () => {
  return (
    <Menu
      items={[
        {
          key: 'news',
          content: 'News',
          id: 'news',
          menu: {
            id: 'firstSubmenu',
            items: [
              { content: '1', id: 'first', key: '1' },
              {
                content: '2',
                id: 'second',
                key: '2',
                menu: {
                  id: 'secondSubmenu',
                  items: [{ content: '3', id: 'third', key: '3' }],
                },
              },
            ],
          },
        },
      ]}
    />
  );
};

export default MenuDismissOnItemClick;
