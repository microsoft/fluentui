import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemSwitch,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const SwitchItem = (): React.ReactNode => (
  <Menu persistOnItemClick>
    <MenuTrigger>
      <button className={styles.trigger}>View</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItemSwitch
          className={`${styles.item} ${styles.itemSpread}`}
          name="show"
          value="grid"
          switchIndicator={{ className: styles.switchTrack, 'aria-hidden': true }}
        >
          Grid view
        </MenuItemSwitch>
        <MenuItemSwitch
          className={`${styles.item} ${styles.itemSpread}`}
          name="show"
          value="hidden"
          switchIndicator={{ className: styles.switchTrack, 'aria-hidden': true }}
        >
          Show hidden files
        </MenuItemSwitch>
      </MenuList>
    </MenuPopover>
  </Menu>
);
