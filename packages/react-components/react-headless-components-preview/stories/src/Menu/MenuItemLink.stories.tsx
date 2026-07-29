import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemLink,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const ItemLink = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Help</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItemLink
          className={`${styles.item} ${styles.itemLink}`}
          href="https://react.fluentui.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Documentation
        </MenuItemLink>
        <MenuItemLink
          className={`${styles.item} ${styles.itemLink}`}
          href="https://github.com/microsoft/fluentui"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </MenuItemLink>
        <MenuDivider className={styles.divider} />
        <MenuItem className={styles.item}>About</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
