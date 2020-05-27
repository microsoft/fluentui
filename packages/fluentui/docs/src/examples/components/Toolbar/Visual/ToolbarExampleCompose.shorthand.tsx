import {
  Toolbar,
  ToolbarMenuDivider,
  ToolbarDivider,
  ToolbarItemWrapper,
  ToolbarItem,
  ToolbarItemIcon,
  ToolbarRadioGroup,
  ToolbarMenuRadioGroupWrapper,
  ToolbarMenuRadioGroup,
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

const ToolbarMenuDividerBlue = compose(ToolbarMenuDivider, {
  displayName: 'ToolbarMenuDividerBlue',
});

const ToolbarDividerGreen = compose(ToolbarDivider, {
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

const ToolbarRadioGroupRed = compose(ToolbarRadioGroup, {
  displayName: 'ToolbarRadioGroupRed',
});

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
    ToolbarRadioGroupRed: {
      root: {
        border: '1px dashed darkred',
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
      <Toolbar
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
            // TODO: replace this with slots after compose in enabled in Toolbar
            children: (C, p) => <ToolbarDividerGreen {...p} />,
          },
          {
            key: 'group',
            kind: 'group',
            items: [
              { key: 'bookmark', icon: <BookmarkIcon /> },
              { key: 'chat', icon: <ChatIcon /> },
            ],
            // TODO: replace this with slots after compose in enabled in Toolbar
            children: (C, p) => <ToolbarRadioGroupRed {...p} />,
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
            children: (C, p) => <ToolbarItemGrey {...p} />,
          },
        ]}
      />
    </Provider>
  );
};

export default ToolbarExampleMenuShorthand;
