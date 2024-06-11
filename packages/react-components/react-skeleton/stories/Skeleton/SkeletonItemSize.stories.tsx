import * as React from 'react';
import { Skeleton, SkeletonItem, makeStyles, Text, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    background: tokens.colorNeutralBackground1,
    flexDirection: 'column',
    padding: tokens.spacingHorizontalXL,
    gap: tokens.spacingVerticalL,
  },
  innerWrapper: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '25px 1fr',
    gridGap: tokens.spacingHorizontalS,
  },
});

const SIZES = [8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] as const;

export const Size = () => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      {SIZES.map(size => (
        <div key={size} className={styles.innerWrapper}>
          <Text align="center">{size}</Text>
          <Skeleton>
            <SkeletonItem size={size} />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `You can specify the size of the \`SkeletonItem\` by using the \`size\` prop.
      The size is a number that represents the height of the \`SkeletonItem\` in pixels`,
    },
  },
};
