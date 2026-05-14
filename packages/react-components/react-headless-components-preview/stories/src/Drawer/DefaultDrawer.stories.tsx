import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-headless-components-preview/drawer';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './drawer.module.css';

export const Default = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(value => !value);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Drawer
        className={styles.drawerOverlay}
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        unmountOnClose={false}
      >
        <DrawerHeader className={styles.drawerHeader}>
          <DrawerHeaderTitle
            action={
              <button aria-label="Close drawer" className={styles.closeButton} onClick={closeDrawer}>
                <DismissRegular />
              </button>
            }
            className={styles.drawerHeaderTitle}
            heading={{ className: styles.drawerHeading }}
          >
            Overlay drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          <DrawerContent />
        </DrawerBody>

        <DrawerFooter className={styles.drawerFooter}>
          <button className={styles.primaryButton} onClick={closeDrawer}>
            Close
          </button>
        </DrawerFooter>
      </Drawer>

      <div className={styles.trigger}>
        <button className={styles.primaryButton} onClick={toggleDrawer}>
          Open drawer
        </button>
      </div>
    </>
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
