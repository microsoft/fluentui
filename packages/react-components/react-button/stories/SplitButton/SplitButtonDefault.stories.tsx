import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const onClick = () => alert('Primary action button clicked.');

const primaryActionButtonProps = {
  onClick,
};

export const Default = () => (
  <Menu positioning="below-end">
    <MenuTrigger disableButtonEnhancement>
      {(triggerProps: MenuButtonProps) => (
        <SplitButton menuButton={triggerProps} primaryActionButton={primaryActionButtonProps}>
          Example
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
);
