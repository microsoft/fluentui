import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuSplitGroup,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

const SubmenuTrigger = (): React.ReactElement => (
  <Menu>
    <MenuTrigger>
      <MenuItem
        className={`${styles.item} ${styles.splitSecondary}`}
        hasSubmenu
        submenuIndicator={<span aria-hidden>›</span>}
      />
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>Save as draft</MenuItem>
        <MenuItem className={styles.item}>Save as template</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

export const SplitMenuItem = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Actions</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuSplitGroup className={styles.splitGroup}>
          <MenuItem className={`${styles.item} ${styles.splitPrimary}`}>Save</MenuItem>
          <SubmenuTrigger />
        </MenuSplitGroup>
        <MenuItem className={styles.item}>Discard</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
