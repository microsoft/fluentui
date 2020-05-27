import {
  Toolbar,
  ToolbarMenuDivider,
  ToolbarRadioGroup,
  ToolbarDivider,
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

const ToolbarRadioGroupRed = compose<'div', {}, {}, ToolbarRadioGroupProps, ToolbarRadioGroupStylesProps>(
  ToolbarRadioGroup,
  {
    displayName: 'ToolbarRadioGroupRed',
  },
);

const ToolbarDividerGreen = compose<'div', {}, {}, ToolbarDividerProps, ToolbarDividerStylesProps>(ToolbarDivider, {
  displayName: 'ToolbarDividerGreen',
});

const ToolbarItemWrapperBlue = compose(ToolbarItemWrapper, {
  displayName: 'ToolbarItemWrapperBlue',
});

const ToolbarItemIconPurple = compose(ToolbarItemIcon, {
  displayName: 'ToolbarItemIconPurple',
});

const ToolbarItemGrey = compose(ToolbarItem, {
  displayName: 'ToolbarItemGrey',
  slots: {
    wrapper: ToolbarItemWrapperBlue,
    icon: ToolbarItemIconPurple,
  },
});

const ToolbarViolet = compose<'div', {}, {}, ToolbarProps, ToolbarStylesProps>(Toolbar, {
  displayName: 'ToolbarViolet',
  slots: {
    group: ToolbarRadioGroupRed,
    divider: ToolbarDividerGreen,
    item: ToolbarItemGrey,
  },
});

const ToolbarMenuDividerBlue = compose<'li', {}, {}, ToolbarMenuDividerProps, ToolbarMenuDividerStylesProps>(
  ToolbarMenuDivider,
  {
    displayName: 'ToolbarMenuDividerBlue',
  },
);

const ToolbarMenuRadioGroupWrapperOrange = compose(ToolbarMenuRadioGroupWrapper, {
  displayName: 'ToolbarMenuRadioGroupWrapperOrange',
});

const ToolbarMenuRadioGroupViolet = compose(ToolbarMenuRadioGroup, {
  displayName: 'ToolbarMenuRadioGroupViolet',
  slots: {
    wrapper: ToolbarMenuRadioGroupWrapperOrange,
  },
});

const themeOverrides: ThemeInput = {
  componentVariables: {
    ToolbarMenuDividerBlue: {
      menuDividerBorder: 'lightblue',
    },
    ToolbarDividerGreen: {
      dividerBorder: 'lightgreen',
    },
  },
  componentStyles: {
    ToolbarViolet: {
      root: {
        border: '1px dashed violet',
      },
    },
    ToolbarRadioGroupRed: {
      root: {
        border: '1px dashed darkred',
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
              { key: 'chat', icon: <ChatIcon /> },
            ],
          },
          {
            icon: <MoreIcon />,
            key: 'more',
            active: true,
            title: 'More',
            menu: {
              items: [
                { key: 'play', content: 'Play', icon: <PlayIcon /> },
                { key: 'pause', content: 'Pause', icon: <PauseIcon /> },
                {
                  key: 'divider',
                  kind: 'divider',
                  // TODO: replace this with slots after compose in enabled in ToolbarMenu
                  children: (C, p) => <ToolbarMenuDividerBlue {...p} />,
                },
                'Without icon',
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
