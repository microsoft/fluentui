import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { SplitButton } from '@fluentui/react-modern-components-preview/split-button';
import type { MenuButtonProps } from '@fluentui/react-modern-components-preview/menu-button';

const onClick = () => alert('Primary action button clicked.');

const primaryActionButtonProps = {
  onClick,
};

export const Default = (): React.ReactNode => (
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
