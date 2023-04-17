import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
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
    backgroundColor: 'lightblue',
  },
});

export const AlwaysOpen = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Drawer type="inline" position="right" open>
        <p>Always open</p>
      </Drawer>

      <div className={styles.content}>
        <p>This is the page content</p>
      </div>
    </div>
  );
};
