import * as React from 'react';

import {
  Menu,
  MenuItem,
  MenuProps,
  compose,
  Provider,
  MenuItemIcon,
  MenuItemContent,
  MenuItemIndicator,
  MenuItemWrapper,
  BookmarkIcon,
  MenuStylesProps,
} from '@fluentui/react-northstar';

const MenuItemWrapperDashed = compose(MenuItemWrapper, {
  displayName: 'MenuItemWrapperDashed',
});

const MenuItemIconGreen = compose(MenuItemIcon, {
  displayName: 'MenuItemIconGreen',
});

const MenuItemContentPurple = compose(MenuItemContent, {
  displayName: 'MenuItemContentPurple',
});

const MenuitemIndicatorSaturated = compose(MenuItemIndicator, {
  displayName: 'MenuitemIndicatorSaturated',
});

const MenuItemBlue = compose(MenuItem, {
  displayName: 'MenuItemBlue',

  slots: {
    icon: MenuItemIconGreen,

    content: MenuItemContentPurple,

    indicator: MenuitemIndicatorSaturated,

    wrapper: MenuItemWrapperDashed,
  },
});

const MenuCoral = compose<'ul', MenuProps, MenuStylesProps, MenuProps, MenuStylesProps>(Menu, {
  displayName: 'MenuCoral',

  slots: {
    item: MenuItemBlue,
  },
});

const items = [
  {
    key: 'editorials',

    content: 'Editorials',

    icon: <BookmarkIcon />,

    menuOpen: true,

    menu: [
      {
        key: 'One',

        content: 'One',

        menu: ['Four', { content: 'Five' }],
      },

      'Two',

      'Three',
    ],
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

    MenuItemContentPurple: {
      root: {
        color: 'purple',
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

    MenuCoral: {
      root: {
        backgroundColor: 'coral',
      },
    },
  },
};

const MenuExampleCompose = () => (
  <Provider theme={themeOverrides}>
    <MenuCoral defaultActiveIndex={0} items={items} />
  </Provider>
);

export default MenuExampleCompose;
