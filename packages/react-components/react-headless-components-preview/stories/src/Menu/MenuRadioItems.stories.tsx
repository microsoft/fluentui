import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemRadio } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const RadioItems = (): React.ReactNode => (
  <Menu persistOnItemClick defaultCheckedValues={{ sortBy: ['name'] }}>
    <MenuTrigger>
      <button className={styles.trigger}>Sort by</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list} hasCheckmarks>
        <MenuItemRadio
          className={styles.item}
          name="sortBy"
          value="name"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '●' }}
        >
          Name
        </MenuItemRadio>
        <MenuItemRadio
          className={styles.item}
          name="sortBy"
          value="size"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '●' }}
        >
          Size
        </MenuItemRadio>
        <MenuItemRadio
          className={styles.item}
          name="sortBy"
          value="modified"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '●' }}
        >
          Last modified
        </MenuItemRadio>
      </MenuList>
    </MenuPopover>
  </Menu>
);
