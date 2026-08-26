import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

export const Submenu = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <Menu>
        <MenuTrigger>
          <Button>Open menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem>Paste special</MenuItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Keep formatting</MenuItem>
                  <MenuItem>Match destination</MenuItem>
                  <MenuItem>Plain text</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  </FluentProvider>
);
