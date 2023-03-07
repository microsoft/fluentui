import * as React from 'react';
import { Skeleton, SkeletonItem, SkeletonProps } from '@fluentui/react-skeleton';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  firstRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    ...shorthands.gap('10px'),
    gridTemplateColumns: 'min-content 80%',
  },
  secondRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    ...shorthands.gap('10px'),
    gridTemplateColumns: 'min-content 20% 20% 15% 15%',
  },
});

const SkeletonElementsFirstRow = () => {
  const classes = useStyles();

  return (
    <div className={classes.firstRow}>
      <SkeletonItem shape="circle" size={24} />
      <SkeletonItem shape="rectangle" size={16} />
    </div>
  );
};

const SkeletonElementsSecondRow = () => {
  const classes = useStyles();

  return (
    <div className={classes.secondRow}>
      <SkeletonItem shape="circle" size={24} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
    </div>
  );
};

const SkeletonElementsThirdRow = () => {
  const classes = useStyles();

  return (
    <div className={classes.secondRow}>
      <SkeletonItem shape="square" size={24} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
      <SkeletonItem size={16} />
    </div>
  );
};

export const Row = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props}>
        <SkeletonElementsFirstRow />
        <SkeletonElementsSecondRow />
        <SkeletonElementsThirdRow />
      </Skeleton>
    </div>
  );
};

Row.parameters = {
  docs: {
    description: {
      story: `You can make more complex wireframes using the basic building blocks of the Skeleton`,
    },
  },
};
