import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-windmod-preview/menu';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

export const SplitGroups = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Menu>
        <MenuTrigger>
          <Button>Share</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuSplitGroup>
              <MenuItem>Send to OneDrive</MenuItem>
              <MenuItem hasSubmenu aria-label="More send options" />
            </MenuSplitGroup>
            <MenuSplitGroup>
              <MenuItem subText="Anyone with the link can view">Copy link</MenuItem>
              <MenuItem hasSubmenu aria-label="More link options" />
            </MenuSplitGroup>
            <MenuItem>Manage access</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  </FluentProvider>
);
