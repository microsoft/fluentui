import * as React from 'react';
import { Skeleton, SkeletonCircle, SkeletonProps } from '@fluentui/react-skeleton';
import { SkeletonLine } from '../../src/components/SkeletonLine/SkeletonLine';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingRight: '50px',
  },
});

const Chat = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SkeletonCircle />
      <div>
        <SkeletonLine width="100px" height="15px" />
        <SkeletonLine width="110px" height="15px" />
      </div>
      <SkeletonLine width="10%" height="15px" />
    </div>
  );
};

export const ChatGroup = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props}>
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </Skeleton>
    </div>
  );
};
