import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import type { MenuProps } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow } from '@fluentui/react-menu';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

const Submenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    if (e.type === 'keydown' && (e as KeyboardEvent).key === 'ArrowDown') {
      return;
    }
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange} positioning={{ autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <Button>More actions</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Show profile </MenuItem>
          <MenuItem>Audio call</MenuItem>
          <MenuItem>Video call</MenuItem>
          <MenuItem>Remove</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const WithSubmenu = () => {
  return (
    <MenuGrid>
      {items.map((name, index) => (
        <MenuGridRow key={index} aria-label={name}>
          <MenuGridCell>{name}</MenuGridCell>
          <MenuGridCell>
            <Submenu />
          </MenuGridCell>
        </MenuGridRow>
      ))}
    </MenuGrid>
  );
};

WithSubmenu.parameters = {
  docs: {
    description: {
      story: [
        'If you need to provide a submenu for a `MenuGrid` item, use a menu button, e.g. "More actions", placed into its own `MenuGridCell`',
      ].join('\n'),
    },
  },
};
