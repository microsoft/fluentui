import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

export const Shape = () => (
  <>
    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Rounded</SplitButton>}
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
          <SplitButton menuButton={triggerProps} shape="circular">
            Circular
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
          <SplitButton menuButton={triggerProps} shape="square">
            Square
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

Shape.parameters = {
  docs: {
    description: {
      story: 'A split button can be rounded, circular, or square.',
    },
  },
};
