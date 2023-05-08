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

export const Separator = () => {
  const styles = useStyles();

  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  return (
    <div className={styles.root}>
      <Drawer
        separator={false}
        type="inline"
        position="right"
        open={leftOpen}
        onOpenChange={(_, { open }) => setLeftOpen(open)}
      >
        <Button appearance="outline" onClick={() => setLeftOpen(false)}>
          Close
        </Button>
        <p>This drawer has no separator</p>
      </Drawer>

      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
          Toggle left
        </Button>

        <Button appearance="primary" onClick={() => setRightOpen(!rightOpen)}>
          Toggle right
        </Button>
      </div>

      <Drawer
        separator
        type="inline"
        position="right"
        open={rightOpen}
        onOpenChange={(_, { open }) => setRightOpen(open)}
      >
        <Button appearance="outline" onClick={() => setRightOpen(false)}>
          Close
        </Button>
        <p>This drawer has a separator</p>
      </Drawer>
    </div>
  );
};
