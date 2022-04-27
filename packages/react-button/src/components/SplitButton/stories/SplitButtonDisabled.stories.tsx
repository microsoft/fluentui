import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { SplitButton, MenuButtonProps } from '../../../index';

export const Disabled = () => {
  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Enabled state</SplitButton>}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} disabled>
              Disabled state
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} disabledFocusable>
              Disabled focusable state
            </SplitButton>
          )}
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
      story: `A split button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled split button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
