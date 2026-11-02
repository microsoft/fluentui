import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const Default = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Open menu</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>New</MenuItem>
        <MenuItem className={styles.item}>Open</MenuItem>
        <MenuItem className={styles.item}>Save</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
