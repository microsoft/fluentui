import * as React from 'react';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  overflowContainer: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  farItems: {
    dislay: 'flex',
    ...shorthands.gap('4px'),
    flexWrap: 'nowrap',
    marginRight: '10px', //to allow the resize handle to be grabbed
  },
});

export const Pinned = () => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Overflow>
        <div className={styles.overflowContainer}>
          {itemIds.map(i => (
            <TestOverflowItem key={i} id={i} />
          ))}
          <OverflowMenu itemIds={itemIds} />
        </div>
      </Overflow>

      <div className={styles.farItems}>
        <Button>Foo</Button>
        <Button>Bar</Button>
      </div>
    </div>
  );
};
