import React from 'react';
import { Menu } from '@fluentui/react-northstar';

const MenuDismissScroll = () => {
  return (
    <div
      style={{
        height: '200vh',
      }}
    >
      <Menu
        items={[
          {
            key: 'news',
            content: 'News',
            menu: {
              items: ['1', '2'],
            },
          },
        ]}
      />
    </div>
  );
};

export default MenuDismissScroll;
