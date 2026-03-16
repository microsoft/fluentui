import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, Tooltip } from '@fluentui/react-components';

export const MenuTriggerWithTooltip = (): JSXElement => (
  <Menu>
    <Tooltip content="This is a tooltip" relationship="description">
      <MenuTrigger disableButtonEnhancement>
        <Button>Toggle menu</Button>
      </MenuTrigger>
    </Tooltip>

    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

MenuTriggerWithTooltip.parameters = {
  docs: {
    description: {
      story: ['A trigger for `Menu` can also have a tooltip.'].join('\n'),
    },
  },
};
