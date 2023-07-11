import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, DrawerInline } from '@fluentui/react-drawer';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export const AlwaysOpen = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DrawerInline separator open>
        <DrawerHeader>
          <DrawerHeaderTitle>Always open</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </DrawerInline>

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
