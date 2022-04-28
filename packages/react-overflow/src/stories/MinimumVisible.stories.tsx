import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },
});

export const MinimumVisible = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow minimumVisible={4}>
      <div className={styles.container}>
        {itemIds.map(i => (
          <TestOverflowItem key={i} id={i} />
        ))}
        <OverflowMenu itemIds={itemIds} />
      </div>
    </Overflow>
  );
};
