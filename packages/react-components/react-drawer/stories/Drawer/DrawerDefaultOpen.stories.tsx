import * as React from 'react';
import { Drawer } from '@fluentui/react-drawer';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';

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

export const DefaultOpen = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className={styles.root}>
      <Drawer type="inline" position="right" open={isOpen} defaultOpen onOpenChange={(_, { open }) => setIsOpen(open)}>
        <Button appearance="outline" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <p>Open by default</p>
      </Drawer>

      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          Toggle left
        </Button>
      </div>
    </div>
  );
};
