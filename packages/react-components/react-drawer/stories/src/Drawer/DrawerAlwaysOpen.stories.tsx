import * as React from 'react';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export const AlwaysOpen = () => {
  const styles = useStyles();

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
