import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItemLink, MenuPopover } from '@fluentui/react-components';

export const MenuItemLinkNavigation = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button>Navigation menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItemLink href="https://www.microsoft.com" target="_blank">
          Home
        </MenuItemLink>
        <MenuItemLink href="https://www.microsoft.com">Online shop</MenuItemLink>
        <MenuItemLink href="https://www.microsoft.com">Contact us</MenuItemLink>
        <MenuItemLink href="https://www.microsoft.com">About</MenuItemLink>
      </MenuList>
    </MenuPopover>
  </Menu>
);

MenuItemLinkNavigation.parameters = {
  docs: {
    description: {
      story: [
        'To implement a navigation menu, simply use the `MenuItemLink` component that provides the correct semantics',
        'for link based navigation.',
      ].join('\n'),
    },
  },
};
