import * as React from 'react';
import { Skeleton, SkeletonItem, SkeletonProps } from '@fluentui/react-skeleton';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const SkeletonElementsFirstRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonItem shape="circle" size={24} style={{ margin: '5px' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '80%' }} />
    </div>
  );
};
const SkeletonElementsSecondRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonItem shape="circle" size={24} style={{ margin: '5px' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '20%' }} />

      <SkeletonItem size={16} style={{ margin: '5px', width: '20%' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '15%' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '15%' }} />
    </div>
  );
};

const SkeletonElementsThirdRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonItem shape="circle" size={24} style={{ margin: '5px' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '20%' }} />

      <SkeletonItem size={16} style={{ margin: '5px', width: '20%' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '15%' }} />
      <SkeletonItem size={16} style={{ margin: '5px', width: '15%' }} />
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
