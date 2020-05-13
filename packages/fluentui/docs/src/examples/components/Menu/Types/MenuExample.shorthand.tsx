import * as React from 'react';
import {
  Menu,
  MenuItem,
  compose,
  Provider,
  MenuItemIcon,
  MenuItemContent,
  BookmarkIcon,
} from '@fluentui/react-northstar';

const MenuItemIconGreen = compose(MenuItemIcon, {
  displayName: 'MenuItemIconGreen',
});

const MenuItemContentPink = compose(MenuItemContent, {
  displayName: 'MenuItemContentPink',
});

const MenuItemBlue = compose(MenuItem, {
  displayName: 'MenuItemBlue',
  slots: {
    icon: MenuItemIconGreen,
    content: MenuItemContentPink,
  },
});

const items = [
  { key: 'editorials', content: 'Editorials', icon: <BookmarkIcon />, children: (C, p) => <MenuItemBlue {...p} /> },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
];

const themeOverrides = {
  componentStyles: {
    MenuItemBlue: {
      root: {
        backgroundColor: 'lightblue',
      },
    },
    MenuItemIconGreen: {
      root: {
        color: 'lightgreen',
      },
    },
    MenuItemContentPink: {
      root: {
        color: 'pink',
      },
    },
  },
};

const MenuExample = () => (
  <Provider theme={themeOverrides}>
    <Menu defaultActiveIndex={0} items={items} />
  </Provider>
);

export default MenuExample;
