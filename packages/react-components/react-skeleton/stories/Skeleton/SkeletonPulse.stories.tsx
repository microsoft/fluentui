import * as React from 'react';
import { Skeleton, SkeletonProps, skeletonGroupClassName } from '@fluentui/react-skeleton';
import { makeStyles, tokens, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: '50px',
    paddingBottom: '50px',
  },
});

export const Pulse = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.invertedWrapper, skeletonGroupClassName)}>
      <Skeleton {...props} animation="pulse" />
    </div>
  );
};
