import * as React from 'react';
import { Skeleton, SkeletonProps } from '@fluentui/react-skeleton';
import { SkeletonLine } from '../../src/components/SkeletonLine/SkeletonLine';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingRight: '50px',
  },
});

const MediaCardSecondRow = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SkeletonLine width="30px" height="30px" />
      <div>
        <SkeletonLine width="100px" height="15px" />
        <SkeletonLine width="200px" height="15px" />
      </div>
    </div>
  );
};

export const MediaCard = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props}>
        <SkeletonLine width="300px" height="160px" />
        <MediaCardSecondRow />
      </Skeleton>
    </div>
  );
};
