import * as React from 'react';
import { Skeleton, SkeletonProps } from '@fluentui/react-skeleton';
import { SkeletonCircle } from '../../src/components/SkeletonCircle/SkeletonCircle';
import { SkeletonLine } from '../../src/components/SkeletonLine/SkeletonLine';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const SkeletonElementsFirstRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonCircle style={{ padding: '10px' }} />
      <SkeletonLine height="24px" width="80%" style={{ padding: '10px' }} />
    </div>
  );
};
const SkeletonElementsSecondRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonCircle radius="24px" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="20%" style={{ padding: '10px' }} />

      <SkeletonLine height="16px" width="20%" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="15%" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="15%" style={{ padding: '10px' }} />
    </div>
  );
};

const SkeletonElementsThirdRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px', position: 'relative' }}>
      <SkeletonCircle radius="24px" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="20%" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="20%" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="15%" style={{ padding: '10px' }} />
      <SkeletonLine height="16px" width="15%" style={{ padding: '10px' }} />
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
