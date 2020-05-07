import { compose } from '@fluentui/react-bindings';
import {
  Provider,
  Toolbar,
  ToolbarItem,
  ToolbarItemProps,
  ToolbarItemStylesProps,
  ToolbarMenu,
  ToolbarMenuItem,
  ToolbarMenuItemProps,
  ToolbarMenuItemStylesProps,
  ToolbarMenuProps,
  ToolbarMenuStylesProps,
  ToolbarProps,
  ToolbarStylesProps,
} from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, PauseIcon, PlayIcon, BoldIcon, UnderlineIcon } from '@fluentui/react-icons-northstar';

const CustomToolbarMenuItem = compose<'button', {}, {}, ToolbarMenuItemProps, ToolbarMenuItemStylesProps>(
  ToolbarMenuItem,
  {
    displayName: 'CustomToolbarMenuItem',
    slots: {
      // menu: CustomToolbarMenu /* WELCOME TO CIRCULAR REFERENCES */,
    },
    // Option 1: to potentially avoid circulars we can use callbacks
    // Option 2: assign non-existant slots on parent and pass them down
    // Option 3: break circular references somehow
  },
);
const CustomToolbarMenu = compose<'ul', {}, {}, ToolbarMenuProps, ToolbarMenuStylesProps>(ToolbarMenu, {
  displayName: 'CustomToolbarMenu',
  slots: {
    item: CustomToolbarMenuItem,
  },
});
const CustomToolbarItem = compose<'button', {}, {}, ToolbarItemProps, ToolbarItemStylesProps>(ToolbarItem, {
  displayName: 'CustomToolbarItem',
  slots: {
    menu: CustomToolbarMenu,
  },
});
const CustomToolbar = compose<'div', {}, {}, ToolbarProps, ToolbarStylesProps>(Toolbar, {
  displayName: 'CustomToolbar',
  slots: {
    item: CustomToolbarItem,
  },
});

const customTheme = {
  componentStyles: {
    CustomToolbar: {
      root: () => ({ border: '1px solid red' }),
    },
    CustomToolbarItem: {
      root: () => ({ background: 'green' }),
    },
    CustomToolbarMenu: {
      root: () => ({ background: 'orange' }),
    },
    CustomToolbarMenuItem: {
      root: () => ({ background: 'blue' }),
    },
  },
};

const ToolbarExampleCompose = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);

  return (
    <Provider theme={customTheme}>
      <CustomToolbar
        aria-label="A Toolbar that uses compose()"
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
            icon: <MoreIcon />,
            key: 'more',
            active: menuOpen,
            title: 'More',
            menu: {
              items: [
                {
                  key: 'play',
                  content: 'Play',
                  icon: <PlayIcon />,
                  menu: ['One', 'Two', 'Three'],
                  menuOpen: subMenuOpen,
                  onMenuOpenChange: (e, data) => setSubMenuOpen(data.menuOpen),
                },
                { key: 'pause', content: 'Pause', icon: <PauseIcon /> },
                { key: 'divider', kind: 'divider' },
                'Without icon',
              ],
            },
            menuOpen,
            onMenuOpenChange: (e, data) => setMenuOpen(data.menuOpen),
          },
        ]}
      />
    </Provider>
  );
};

export default ToolbarExampleCompose;
