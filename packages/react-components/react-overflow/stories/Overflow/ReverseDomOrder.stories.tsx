import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Overflow } from '@fluentui/react-overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },
});

export const ReverseDomOrder = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow overflowDirection="start">
      <div className={styles.container}>
        <OverflowMenu itemIds={itemIds} />
        {itemIds.map(i => (
          <TestOverflowItem key={i} id={i} />
        ))}
      </div>
    </Overflow>
  );
};
