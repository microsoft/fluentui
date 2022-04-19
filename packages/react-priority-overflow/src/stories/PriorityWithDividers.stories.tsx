import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowGroupDivider, TestOverflowItem } from './utils.stories';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },
});

export const PriorityWithDividers = () => {
  const styles = useStyles();

  return (
    <Overflow overflowDirection="start" padding={30}>
      <div className={styles.container}>
        <TestOverflowItem id={'6'} priority={6} groupId={'1'} />
        <TestOverflowGroupDivider groupId={'1'} />
        <TestOverflowItem id={'7'} priority={7} groupId={'2'} />
        <TestOverflowGroupDivider groupId={'2'} />
        <TestOverflowItem id={'4'} priority={4} groupId={'3'} />
        <TestOverflowItem id={'5'} priority={5} groupId={'3'} />
        <TestOverflowGroupDivider groupId={'3'} />
        <TestOverflowItem id={'1'} priority={1} groupId={'4'} />
        <TestOverflowItem id={'2'} priority={2} groupId={'4'} />
        <TestOverflowItem id={'3'} priority={3} groupId={'4'} />
        <TestOverflowGroupDivider groupId={'4'} />
        <TestOverflowItem id={'8'} priority={8} groupId={'5'} />
        <OverflowMenu
          itemIds={['6', 'divider-1', '7', 'divider-2', '4', '5', 'divider-3', '1', '2', '3', 'divider-4', '8']}
        />
      </div>
    </Overflow>
  );
};
