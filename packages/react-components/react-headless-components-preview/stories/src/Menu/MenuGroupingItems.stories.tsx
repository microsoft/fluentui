import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const GroupingItems = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Insert</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuGroup className={styles.group}>
          <MenuGroupHeader className={styles.groupHeader}>Document</MenuGroupHeader>
          <MenuItem className={styles.item}>Page</MenuItem>
          <MenuItem className={styles.item}>Section</MenuItem>
        </MenuGroup>
        <MenuDivider className={styles.divider} />
        <MenuGroup className={styles.group}>
          <MenuGroupHeader className={styles.groupHeader}>Media</MenuGroupHeader>
          <MenuItem className={styles.item}>Image</MenuItem>
          <MenuItem className={styles.item}>Video</MenuItem>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);
