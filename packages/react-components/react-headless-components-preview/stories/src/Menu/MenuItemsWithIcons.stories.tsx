import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

const Icon = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <span aria-hidden className={styles.icon}>
    {children}
  </span>
);

export const ItemsWithIcons = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>File</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item} icon={<Icon>📄</Icon>}>
          New
        </MenuItem>
        <MenuItem className={styles.item} icon={<Icon>📂</Icon>}>
          Open
        </MenuItem>
        <MenuItem className={styles.item} icon={<Icon>💾</Icon>}>
          Save
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
