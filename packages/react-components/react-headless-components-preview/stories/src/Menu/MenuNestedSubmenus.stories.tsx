import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

const Submenu = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Menu>
    <MenuTrigger>
      <MenuItem
        className={styles.item}
        hasSubmenu
        submenuIndicator={
          <span aria-hidden className={styles.chevron}>
            ›
          </span>
        }
      >
        {label}
      </MenuItem>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>{children}</MenuList>
    </MenuPopover>
  </Menu>
);

export const NestedSubmenus = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={styles.trigger}>File</button>
    </MenuTrigger>
    <MenuPopover className={styles.surface}>
      <MenuList className={styles.list}>
        <MenuItem className={styles.item}>New</MenuItem>
        <Submenu label="Open recent">
          <MenuItem className={styles.item}>Document.docx</MenuItem>
          <MenuItem className={styles.item}>Spreadsheet.xlsx</MenuItem>
          <Submenu label="Older">
            <MenuItem className={styles.item}>2024 archive</MenuItem>
            <MenuItem className={styles.item}>2023 archive</MenuItem>
          </Submenu>
        </Submenu>
        <MenuItem className={styles.item}>Save</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
