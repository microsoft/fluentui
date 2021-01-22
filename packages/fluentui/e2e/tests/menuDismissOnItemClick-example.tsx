import React from 'react';
import { Menu } from '@fluentui/react-northstar';

export const firstSubmenuItemID = 'first';
export const secondSubmenuItemID = 'second';

export const firstSubmenuID = 'firstSubmenu';
export const secondSubmenuID = 'secondSubmenu';

const MenuDismissOnItemClick = () => {
  return (
    <Menu
      items={[
        {
          key: 'news',
          content: 'News',
          id: 'news',
          menu: {
            id: firstSubmenuID,
            items: [
              { content: '1', id: firstSubmenuItemID, key: '1' },
              {
                content: '2',
                id: secondSubmenuItemID,
                key: '2',
                menu: {
                  id: secondSubmenuID,
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
