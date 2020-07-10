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
  MenuItemProps,
  MenuItemStylesProps,
} from '@fluentui/react-northstar';
import { FloatProperty } from 'csstype';

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

interface MenuItemBlueOwnProps {
  level?: number;
}

interface MenuItemBlueProps extends MenuItemProps, MenuItemBlueOwnProps {}

const MenuItemBlue = compose<'a', MenuItemBlueProps, MenuItemStylesProps, MenuItemProps, MenuItemStylesProps>(
  MenuItem,
  {
    displayName: 'MenuItemBlue',
    slots: {
      icon: MenuItemIconGreen,
      content: MenuItemContentPurple,
      indicator: MenuitemIndicatorSaturated,
      wrapper: MenuItemWrapperDashed,
    },
    slotProps: props => ({
      menu: {
        level: props.level + 1,
      },
    }),
  },
);

interface MenuColorfulOwnProps {
  level?: number;
}

interface MenuColorfulProps extends MenuColorfulOwnProps, MenuProps {}

interface MenuColorfulOwnStylesProps {
  level?: number;
}

interface MenuColorfulStylesProps extends MenuColorfulOwnStylesProps, MenuStylesProps {}

const MenuColorful = compose<'ul', MenuColorfulProps, MenuColorfulStylesProps, MenuProps, MenuStylesProps>(Menu, {
  displayName: 'MenuColorful',
  slots: {
    item: MenuItemBlue,
  },
  mapPropsToStylesProps: props => ({
    level: props.level,
  }),
  slotProps: props => ({
    item: {
      level: props.level || 0,
    },
  }),
});

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    icon: <BookmarkIcon />,
    defaultMenuOpen: true,
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
        overflow: 'visible',
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
        backgroundSize: '20px',
        height: '20px',
        width: '20px',
        float: 'right' as FloatProperty,
      },
    },
    MenuItemWrapperDashed: {
      root: {
        border: '1px dashed lightgreen',
      },
    },
    MenuColorful: {
      root: ({ props }) => ({
        backgroundColor: 'coral',
        ...(props.level === 1 && {
          backgroundColor: 'teal',
        }),
        ...(props.level === 2 && {
          backgroundColor: 'pink',
        }),
      }),
    },
  },
};

const MenuExampleCompose = () => (
  <Provider theme={themeOverrides}>
    <MenuColorful defaultActiveIndex={0} items={items} />
  </Provider>
);

export default MenuExampleCompose;
