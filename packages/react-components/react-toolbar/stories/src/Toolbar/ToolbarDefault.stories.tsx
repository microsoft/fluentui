import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FontIncreaseRegular, FontDecreaseRegular, TextFontRegular, MoreHorizontalFilled } from '@fluentui/react-icons';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const Default = (props: Partial<ToolbarProps>): JSXElement => (
  <Toolbar aria-label="Default" {...props}>
    <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
    <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
    <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
    <ToolbarDivider />
    <Menu>
      <MenuTrigger>
        <ToolbarButton aria-label="More" icon={<MoreHorizontalFilled />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </Toolbar>
);
