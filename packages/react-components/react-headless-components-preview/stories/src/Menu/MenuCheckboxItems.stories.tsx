import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemCheckbox,
} from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const CheckboxItems = (): React.ReactNode => (
  <Menu persistOnItemClick>
    <MenuTrigger>
      <button className={styles.trigger}>Filters</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list} hasCheckmarks>
        <MenuItemCheckbox
          className={styles.item}
          name="filters"
          value="bold"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '✓' }}
        >
          Bold
        </MenuItemCheckbox>
        <MenuItemCheckbox
          className={styles.item}
          name="filters"
          value="italic"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '✓' }}
        >
          Italic
        </MenuItemCheckbox>
        <MenuItemCheckbox
          className={styles.item}
          name="filters"
          value="underline"
          checkmark={{ className: styles.checkmark, 'aria-hidden': true, children: '✓' }}
        >
          Underline
        </MenuItemCheckbox>
      </MenuList>
    </MenuPopover>
  </Menu>
);
