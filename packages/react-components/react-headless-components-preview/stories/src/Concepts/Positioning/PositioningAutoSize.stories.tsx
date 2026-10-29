import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from '../../Overflow/overflow.module.css';

export const AutoSize = (): React.ReactElement => (
  <Menu positioning={{ autoSize: 'height' }}>
    <MenuTrigger>
      <button className={styles.menu}>Open a scrollable menu</button>
    </MenuTrigger>
    <MenuPopover className={styles.menuPopover}>
      <MenuList className={styles.menuList}>
        {Array.from({ length: 20 }, (_, index) => (
          <MenuItem key={index} className={styles.menuItem}>
            Item {index + 1}
          </MenuItem>
        ))}
      </MenuList>
    </MenuPopover>
  </Menu>
);

AutoSize.parameters = {
  docs: {
    description: {
      story:
        "Open the menu, then reduce the viewport height. Height-only autosizing preserves the menu's width and lets normal Up/Down and Home/End navigation scroll focused items into view.",
    },
  },
};
