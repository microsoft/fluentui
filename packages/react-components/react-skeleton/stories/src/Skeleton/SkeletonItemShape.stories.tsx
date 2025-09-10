import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Skeleton, SkeletonItem, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    background: tokens.colorNeutralBackground1,
    display: 'flex',
    padding: tokens.spacingHorizontalXL,
  },
  row: {
    display: 'grid',
    gap: tokens.spacingHorizontalL,
    gridTemplateColumns: '1fr 150px 1fr',
  },
});

export const Shape = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton className={styles.row} aria-label="Loading Content">
        <SkeletonItem size={64} shape="circle" />
        <SkeletonItem size={64} shape="rectangle" />
        <SkeletonItem size={64} shape="square" />
      </Skeleton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: `The shape of the \`SkeletonItem\` can be set to circle, rectangle, or square.`,
    },
  },
};
