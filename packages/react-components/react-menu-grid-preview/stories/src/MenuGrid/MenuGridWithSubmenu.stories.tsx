import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';

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

export const WithSubmenu = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map((name, index) => (
            <MenuGridItem key={index} firstSubAction={<Submenu />} aria-label={name}>
              {name}
            </MenuGridItem>
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
        'If you need to provide a submenu for a `MenuGridItem`, use a menu button, e.g. "More actions", provided via `firstSubAction` or `secondSubAction` slots.',
      ].join('\n'),
    },
  },
};
