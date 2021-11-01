import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
/* eslint-enable @typescript-eslint/ban-ts-comment */
export const WithLongText = () => (
  <>
    <Menu>
      <MenuTrigger>
        <MenuButton>Text</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <Menu>
      <MenuTrigger>
        <MenuButton>Text truncates after it hits the max width token value</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
