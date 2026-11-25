import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';
import { MenuButton } from '@fluentui/react-headless-components-preview/menu-button';
import { ChevronDownRegular } from '@fluentui/react-icons';

import styles from './menu-button.module.css';

export const Default = (): React.ReactNode => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <MenuButton className={styles.button} menuIcon={<ChevronDownRegular aria-hidden />}>
        Actions
      </MenuButton>
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
