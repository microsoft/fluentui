import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const SecondaryContent = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>Edit</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem
          className={`${styles.item} ${styles.itemSpread}`}
          secondaryContent={<span className={styles.shortcut}>⌘X</span>}
        >
          Cut
        </MenuItem>
        <MenuItem
          className={`${styles.item} ${styles.itemSpread}`}
          secondaryContent={<span className={styles.shortcut}>⌘C</span>}
        >
          Copy
        </MenuItem>
        <MenuItem
          className={`${styles.item} ${styles.itemSpread}`}
          secondaryContent={<span className={styles.shortcut}>⌘V</span>}
        >
          Paste
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
