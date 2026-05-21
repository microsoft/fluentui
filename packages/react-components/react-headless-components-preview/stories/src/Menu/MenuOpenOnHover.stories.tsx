import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const OpenOnHover = (): React.ReactNode => (
  <Menu openOnHover>
    <MenuTrigger>
      <button className={styles.trigger}>Hover me</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>Item 1</MenuItem>
        <MenuItem className={styles.item}>Item 2</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
