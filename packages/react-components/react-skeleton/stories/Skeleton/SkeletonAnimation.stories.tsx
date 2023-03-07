import * as React from 'react';
import { Skeleton, SkeletonItem, SkeletonProps } from '@fluentui/react-skeleton';
import { Field } from '@fluentui/react-field';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: '50px',
    paddingBottom: '50px',
  },
});

export const Animation = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Field validationMessage="Wave animation" validationState="none">
        <Skeleton {...props}>
          <SkeletonItem />
        </Skeleton>
      </Field>
      <Field validationMessage="Pulse animation" validationState="none">
        <Skeleton {...props} animation="pulse">
          <SkeletonItem />
        </Skeleton>
      </Field>
    </div>
  );
};

Animation.parameters = {
  docs: {
    description: {
      story: `You can specify the animation style of the Skeleton.
      The default is 'wave' with the alternative being 'pulse'`,
    },
  },
};
