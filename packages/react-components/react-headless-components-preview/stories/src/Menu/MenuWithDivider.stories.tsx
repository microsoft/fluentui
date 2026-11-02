import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const WithDivider = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Actions</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>Cut</MenuItem>
        <MenuItem className={styles.item}>Copy</MenuItem>
        <MenuItem className={styles.item}>Paste</MenuItem>
        <MenuDivider className={styles.divider} />
        <MenuItem className={styles.item}>Delete</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
