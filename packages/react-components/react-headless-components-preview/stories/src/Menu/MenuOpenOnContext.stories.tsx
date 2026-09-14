import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const OpenOnContext = (): React.ReactNode => (
  <Menu openOnContext>
    <MenuTrigger>
      <div className={styles.contextTarget}>Right-click me</div>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>Cut</MenuItem>
        <MenuItem className={styles.item}>Copy</MenuItem>
        <MenuItem className={styles.item}>Paste</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
