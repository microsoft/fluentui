import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './drawer.module.css';

export const Inline = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(value => !value);
  const closeDrawer = () => setOpen(false);

  return (
    <div className={styles.inlineFrame}>
      <Drawer className={styles.drawerInline} type="inline" open={open} unmountOnClose={false}>
        <DrawerHeader className={styles.drawerHeader}>
          <DrawerHeaderTitle
            action={
              <button aria-label="Close drawer" className={styles.closeButton} onClick={closeDrawer}>
                <DismissRegular />
              </button>
            }
            className={`${styles.drawerHeaderTitle} ${styles.drawerHeaderTitleInline}`}
            heading={{ className: styles.drawerHeadingInline }}
          >
            Inline drawer
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className={styles.drawerBody}>
          <DrawerContent />
        </DrawerBody>
      </Drawer>

      <main className={styles.inlineMain}>
        <button className={styles.primaryButton} onClick={toggleDrawer}>
          {open ? 'Hide inline drawer' : 'Show inline drawer'}
        </button>
      </main>
    </div>
  );
};

const DrawerContent = () => {
  const items = ['Dashboard', 'Activity', 'Projects', 'Calendar', 'Settings'];

  return (
    <nav aria-label="Example navigation" className={styles.nav}>
      {items.map((item, index) => (
        <a key={item} aria-current={index === 0 ? 'page' : undefined} href="#" className={styles.navLink}>
          {item}
        </a>
      ))}
    </nav>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'The main content remains available while an inline drawer is visible.',
    },
  },
};
