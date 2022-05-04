import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { SplitButton, MenuButtonProps } from '../../../index';

export const WithLongText = () => (
  <>
    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Short text</SplitButton>}
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
          <SplitButton menuButton={triggerProps}>
            Long text truncates after it hits the max width of the component
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
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width of the component.',
    },
  },
};
