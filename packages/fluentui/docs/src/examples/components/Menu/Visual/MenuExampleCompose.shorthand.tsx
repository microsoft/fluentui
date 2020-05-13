import * as React from 'react';
import {
  Menu,
  MenuItem,
  compose,
  Provider,
  MenuItemIcon,
  MenuItemContent,
  MenuItemIndicator,
  MenuItemWrapper,
  BookmarkIcon,
} from '@fluentui/react-northstar';

const MenuItemWrapperDashed = compose(MenuItemWrapper, {
  displayName: 'MenuItemWrapperDashed',
});

const MenuItemIconGreen = compose(MenuItemIcon, {
  displayName: 'MenuItemIconGreen',
});

const MenuItemContentPink = compose(MenuItemContent, {
  displayName: 'MenuItemContentPink',
});

const MenuitemIndicatorSaturated = compose(MenuItemIndicator, {
  displayName: 'MenuitemIndicatorSaturated',
});

const MenuItemBlue = compose(MenuItem, {
  displayName: 'MenuItemBlue',
  slots: {
    icon: MenuItemIconGreen,
    content: MenuItemContentPink,
    indicator: MenuitemIndicatorSaturated,
    wrapper: MenuItemWrapperDashed,
  },
});

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    icon: <BookmarkIcon />,
    menu: ['One', 'Two', 'Three'],
    children: (C, p) => <MenuItemBlue {...p} />,
  },
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
    MenuitemIndicatorSaturated: {
      root: {
        filter: 'saturate(8)',
        height: '20px',
        width: '20px',
      },
    },
    MenuItemWrapperDashed: {
      root: {
        border: '1px dashed lightgreen',
      },
    },
  },
};

const MenuExampleCompose = () => (
  <Provider theme={themeOverrides}>
    <Menu defaultActiveIndex={0} items={items} />
  </Provider>
);

export default MenuExampleCompose;
