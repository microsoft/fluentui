import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

import styles from './menu.module.css';

export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.column}>
      <button className={styles.triggerSecondary} onClick={() => setOpen(value => !value)}>
        Toggle from outside (open: {String(open)})
      </button>
      <Menu open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <MenuTrigger>
          <button className={styles.trigger}>Open menu</button>
        </MenuTrigger>
        <MenuPopover className={styles.surface}>
          <MenuList className={styles.list}>
            <MenuItem className={styles.item}>One</MenuItem>
            <MenuItem className={styles.item}>Two</MenuItem>
            <MenuItem className={styles.item}>Three</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
