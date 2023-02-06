import * as React from 'react';
import { Skeleton, SkeletonLine, SkeletonProps } from '@fluentui/react-skeleton';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: '50px',
    paddingBottom: '50px',
  },
});

export const Material = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props} appearance="material">
        <SkeletonLine />
      </Skeleton>
    </div>
  );
};
