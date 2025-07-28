import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow } from '@fluentui/react-menu-grid-preview';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

const Submenu = () => {
  return (
    <Menu positioning={{ autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <Button
          onKeyDown={event => {
            if (event.key === 'ArrowDown') {
              // Prevent arrow down from opening the menu to enable navigation in grid instead
              event.preventDefault();
            }
          }}
        >
          More actions
        </Button>
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
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
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
      </MenuPopover>
    </Menu>
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
