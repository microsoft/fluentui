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

export const CustomPriorities = () => {
  const styles = useStyles();

  const priorities = [2, 3, 6, 1, 4, 5, 0, 7];

  return (
    <Overflow>
      <div className={styles.container}>
        {priorities.map(i => (
          <TestOverflowItem key={i} id={i.toString()} priority={i} />
        ))}
        <OverflowMenu itemIds={priorities.map(x => x.toString())} />
      </div>
    </Overflow>
  );
};
