import * as React from 'react';
import { Menu, menuItemClassName } from '@fluentui/react-northstar';

export const selectors = {
  item: menuItemClassName,
};

const DismissMenuOnScroll = () => (
  <div
    style={{
      height: '120vh',
    }}
  >
    <Menu
      items={[
        {
          key: 'editorials',
          content: 'Editorials',
          menu: {
            items: ['1', '2'],
          },
        },
      ]}
    />
  </div>
);

export default DismissMenuOnScroll;
