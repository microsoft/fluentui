import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { MenuButton } from '../../../MenuButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Disabled = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton disabledFocusable>This is disabledFocusable</MenuButton>
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
          <MenuButton disabled>This is disabled</MenuButton>
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
          <MenuButton disabledFocusable>This is disabledFocusable</MenuButton>
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
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A menu button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled menu button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
