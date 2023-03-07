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

export const Appearance = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.invertedWrapper}>
      <Field validationMessage="Opaque Appearance" validationState="none">
        <Skeleton {...props}>
          <SkeletonItem />
        </Skeleton>
      </Field>
      <Field validationMessage="Translucent Appearance" validationState="none">
        <Skeleton {...props} appearance="translucent">
          <SkeletonItem />
        </Skeleton>
      </Field>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: `You can specify the appearance of the Skeleton.
      This is useful for instances where you want to render a Skeleton with a MaterialOS theme`,
    },
  },
};
