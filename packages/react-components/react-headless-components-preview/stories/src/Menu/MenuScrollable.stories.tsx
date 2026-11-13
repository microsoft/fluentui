import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const Scrollable = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Open scrollable menu</button>
    </MenuTrigger>
    <MenuPopover className={`${styles.surface} ${styles.scrollableSurface}`}>
      <MenuList className={styles.list}>
        {Array.from({ length: 20 }, (_, index) => (
          <MenuItem key={index} className={styles.item}>
            Action {index + 1}
          </MenuItem>
        ))}
      </MenuList>
    </MenuPopover>
  </Menu>
);
