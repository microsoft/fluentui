import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer } from '@fluentui/react-components';

import styles from './DrawerAlwaysOpen.module.css';

export const AlwaysOpen = (): JSXElement => {
  return (
    <div className={styles.root}>
      <InlineDrawer separator open>
        <DrawerHeader>
          <DrawerHeaderTitle>Always open</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div className={styles.content}>
        <p>This is the page content</p>
      </div>
    </div>
  );
};

AlwaysOpen.parameters = {
  docs: {
    description: {
      story: [
        'A drawer can be always open, in which case it will not be able to be closed by the user.',
        'This is useful for drawers that are used for navigation, and should always be visible.',
      ].join('\n'),
    },
  },
};
