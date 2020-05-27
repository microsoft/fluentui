import {
  Text,
  Toolbar,
  ToolbarMenuDivider,
  ToolbarRadioGroup,
  ToolbarDivider,
  ToolbarItem,
  ToolbarItemWrapper,
  ToolbarItemIcon,
  ToolbarMenuItem,
  ToolbarMenuItemActiveIndicator,
  ToolbarMenuRadioGroupWrapper,
  ToolbarMenuRadioGroup,
  ToolbarMenuItemIcon,
  ToolbarMenuItemSubmenuIndicator,
  ToolbarProps,
  ToolbarStylesProps,
  ToolbarMenuDividerProps,
  ToolbarMenuDividerStylesProps,
  ToolbarRadioGroupProps,
  ToolbarRadioGroupStylesProps,
  ToolbarDividerProps,
  ToolbarDividerStylesProps,
  Provider,
  compose,
  ThemeInput,
  ToolbarItemWrapperProps,
  ToolbarItemWrapperStylesProps,
  ToolbarItemIconProps,
  ToolbarItemIconStylesProps,
  ToolbarMenuItemIconProps,
  ToolbarItemStylesProps,
  ToolbarItemProps,
  ToolbarCustomItemProps,
  ToolbarCustomItemStylesProps,
  ToolbarCustomItem,
  ToolbarMenuItemActiveIndicatorProps,
  ToolbarMenuItemActiveIndicatorStylesProps,
  ToolbarMenuItemSubmenuIndicatorProps,
  ToolbarMenuItemSubmenuIndicatorStylesProps,
  ToolbarMenuItemIconStylesProps,
  ToolbarMenuRadioGroupWrapperStylesProps,
  ToolbarMenuRadioGroupWrapperProps,
  ToolbarMenuRadioGroupStylesProps,
  ToolbarMenuRadioGroupProps,
  ToolbarMenuItemStylesProps,
  ToolbarMenuItemProps,
} from '@fluentui/react-northstar';
import * as React from 'react';
import {
  MoreIcon,
  PauseIcon,
  PlayIcon,
  BoldIcon,
  UnderlineIcon,
  BookmarkIcon,
  ChatIcon,
  BulletsIcon,
  ToDoListIcon,
} from '@fluentui/react-icons-northstar';

const ToolbarCustomItemOlive = compose<'div', {}, {}, ToolbarCustomItemProps, ToolbarCustomItemStylesProps>(
  ToolbarCustomItem,
  {
    displayName: 'ToolbarCustomItemOlive',
  },
);

const ToolbarRadioGroupItemRed = compose<'button', {}, {}, ToolbarItemProps, ToolbarItemStylesProps>(ToolbarItem, {
  displayName: 'ToolbarRadioGroupItemRed',
});

const ToolbarRadioGroupDividerRed = compose<'div', {}, {}, ToolbarDividerProps, ToolbarDividerStylesProps>(
  ToolbarDivider,
  {
    displayName: 'ToolbarRadioGroupDividerRed',
  },
);

const ToolbarRadioGroupRed = compose<'div', {}, {}, ToolbarRadioGroupProps, ToolbarRadioGroupStylesProps>(
  ToolbarRadioGroup,
  {
    displayName: 'ToolbarRadioGroupRed',
    slots: {
      item: ToolbarRadioGroupItemRed,
      divider: ToolbarRadioGroupDividerRed,
    },
  },
);

const ToolbarDividerGreen = compose<'div', {}, {}, ToolbarDividerProps, ToolbarDividerStylesProps>(ToolbarDivider, {
  displayName: 'ToolbarDividerGreen',
});

const ToolbarItemWrapperBlue = compose<'div', {}, {}, ToolbarItemWrapperProps, ToolbarItemWrapperStylesProps>(
  ToolbarItemWrapper,
  {
    displayName: 'ToolbarItemWrapperBlue',
  },
);

const ToolbarItemIconPurple = compose<'div', {}, {}, ToolbarItemIconProps, ToolbarItemIconStylesProps>(
  ToolbarItemIcon,
  {
    displayName: 'ToolbarItemIconPurple',
  },
);

const ToolbarItemGrey = compose<'button', {}, {}, ToolbarItemProps, ToolbarItemStylesProps>(ToolbarItem, {
  displayName: 'ToolbarItemGrey',
  slots: {
    wrapper: ToolbarItemWrapperBlue,
    icon: ToolbarItemIconPurple,
  },
});

const ToolbarViolet = compose<'div', {}, {}, ToolbarProps, ToolbarStylesProps>(Toolbar, {
  displayName: 'ToolbarViolet',
  slots: {
    customItem: ToolbarCustomItemOlive,
    divider: ToolbarDividerGreen,
    group: ToolbarRadioGroupRed,
    item: ToolbarItemGrey,
  },
});

const ToolbarMenuDividerBlue = compose<'li', {}, {}, ToolbarMenuDividerProps, ToolbarMenuDividerStylesProps>(
  ToolbarMenuDivider,
  {
    displayName: 'ToolbarMenuDividerBlue',
  },
);

const ToolbarMenuItemActiveIndicatorGreen = compose<
  'li',
  {},
  {},
  ToolbarMenuItemActiveIndicatorProps,
  ToolbarMenuItemActiveIndicatorStylesProps
>(ToolbarMenuItemActiveIndicator, {
  displayName: 'ToolbarMenuItemActiveIndicatorGreen',
});

const ToolbarMenuItemSubmenuIndicatorBlue = compose<
  'li',
  {},
  {},
  ToolbarMenuItemSubmenuIndicatorProps,
  ToolbarMenuItemSubmenuIndicatorStylesProps
>(ToolbarMenuItemSubmenuIndicator, {
  displayName: 'ToolbarMenuItemSubmenuIndicatorBlue',
});

const ToolbarMenuItemIconOrange = compose<'li', {}, {}, ToolbarMenuItemIconProps, ToolbarMenuItemIconStylesProps>(
  ToolbarMenuItemIcon,
  {
    displayName: 'ToolbarMenuItemIconOrange',
  },
);

const ToolbarMenuItemGrey = compose<'button', {}, {}, ToolbarMenuItemProps, ToolbarMenuItemStylesProps>(
  ToolbarMenuItem,
  {
    displayName: 'ToolbarMenuItemGrey',
    slots: {
      icon: ToolbarMenuItemIconOrange,
      submenuIndicator: ToolbarMenuItemSubmenuIndicatorBlue,
      activeIndicator: ToolbarMenuItemActiveIndicatorGreen,
    },
  },
);

const ToolbarMenuRadioGroupWrapperOrange = compose<
  'li',
  {},
  {},
  ToolbarMenuRadioGroupWrapperProps,
  ToolbarMenuRadioGroupWrapperStylesProps
>(ToolbarMenuRadioGroupWrapper, {
  displayName: 'ToolbarMenuRadioGroupWrapperOrange',
});

const ToolbarMenuRadioGroupViolet = compose<'ul', {}, {}, ToolbarMenuRadioGroupProps, ToolbarMenuRadioGroupStylesProps>(
  ToolbarMenuRadioGroup,
  {
    displayName: 'ToolbarMenuRadioGroupViolet',
    slots: {
      wrapper: ToolbarMenuRadioGroupWrapperOrange,
    },
  },
);

const themeOverrides: ThemeInput = {
  componentVariables: {
    ToolbarMenuDividerBlue: {
      menuDividerBorder: 'lightblue',
    },
    ToolbarDividerGreen: {
      dividerBorder: 'lightgreen',
    },
    ToolbarRadioGroupDividerRed: {
      dividerBorder: 'darkred',
    },
  },
  componentStyles: {
    ToolbarViolet: {
      root: {
        border: '1px dashed violet',
      },
    },
    ToolbarCustomItemOlive: {
      root: {
        color: 'olive',
        fontStyle: 'italic',
      },
    },
    ToolbarRadioGroupRed: {
      root: {
        border: '1px dashed darkred',
      },
    },
    ToolbarRadioGroupItemRed: {
      root: {
        color: 'darkred',
      },
    },
    ToolbarItemWrapperBlue: {
      root: {
        border: '1px dashed lightblue',
      },
    },
    ToolbarItemIconPurple: {
      root: {
        color: 'purple',
      },
    },
    ToolbarItemGrey: {
      root: {
        background: 'lightgrey',
      },
    },
    ToolbarMenuRadioGroupWrapperOrange: {
      root: {
        border: '1px dashed orange',
      },
    },
    ToolbarMenuRadioGroupViolet: {
      root: {
        border: '1px solid violet',
      },
    },
    ToolbarMenuItemActiveIndicatorGreen: {
      root: {
        border: '1px solid lightgreen',
        width: '36px',
      },
    },
    ToolbarMenuItemSubmenuIndicatorBlue: {
      root: {
        border: '1px solid lightblue',
        width: '36px',
      },
    },
    ToolbarMenuItemIconOrange: {
      root: {
        color: 'orange',
      },
    },
    ToolbarMenuItemGrey: {
      root: {
        border: '1px dashed lightgrey',
      },
    },
  },
};

const ToolbarExampleMenuShorthand = () => {
  return (
    <Provider theme={themeOverrides}>
      <ToolbarViolet
        aria-label="Toolbar can contain a menu"
        items={[
          {
            key: 'bold',
            content: 'bold',
            icon: <BoldIcon />,
            title: 'Bold',
          },
          {
            key: 'underline',
            content: 'underline',
            icon: <UnderlineIcon />,
            title: 'Underline',
          },
          {
            key: 'divider',
            kind: 'divider',
          },
          {
            key: 'group',
            kind: 'group',
            items: [
              { key: 'bookmark', icon: <BookmarkIcon /> },
              { key: 'divider', kind: 'divider' },
              { key: 'chat', icon: <ChatIcon /> },
            ],
          },
          {
            key: 'custom',
            kind: 'custom',
            content: <Text content="Olive" />,
          },
          {
            icon: <MoreIcon />,
            key: 'more',
            active: true,
            title: 'More',
            menu: {
              items: [
                {
                  key: 'play',
                  content: 'Play',
                  icon: <PlayIcon />,
                  active: true,
                  // TODO: replace this with slots after compose in enabled in ToolbarMenu
                  children: (C, p) => <ToolbarMenuItemGrey {...p} />,
                },
                {
                  key: 'pause',
                  content: 'Pause',
                  icon: <PauseIcon />,
                  menu: ['Pause 1.1'],
                  // TODO: replace this with slots after compose in enabled in ToolbarMenu
                  children: (C, p) => <ToolbarMenuItemGrey {...p} />,
                },
                {
                  key: 'divider',
                  kind: 'divider',
                  // TODO: replace this with slots after compose in enabled in ToolbarMenu
                  children: (C, p) => <ToolbarMenuDividerBlue {...p} />,
                },
                // TODO: replace this with slots after compose in enabled in ToolbarMenu
                { content: 'Without icon', children: (C, p) => <ToolbarMenuItemGrey {...p} /> },
                {
                  key: 'group',
                  kind: 'group',
                  items: [
                    { key: 'bullets', icon: <BulletsIcon /> },
                    { key: 'to-do-list', icon: <ToDoListIcon /> },
                  ],
                  // TODO: replace this with slots after compose in enabled in ToolbarMenu
                  children: (C, p) => <ToolbarMenuRadioGroupViolet {...p} />,
                },
              ],
            },
            menuOpen: true,
          },
        ]}
      />
    </Provider>
  );
};

export default ToolbarExampleMenuShorthand;
