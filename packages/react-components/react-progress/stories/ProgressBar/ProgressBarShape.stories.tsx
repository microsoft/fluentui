import * as React from 'react';
import { Field } from '@fluentui/react-field';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-progress';

const useStyles = makeStyles({
  container: {
    ...shorthands.margin('20px', '0px'),
  },
});

export const Shape = () => {
  const styles = useStyles();

  return (
    <div>
      <Field validationMessage="Rounded ProgressBar" validationState="none">
        <ProgressBar className={styles.container} shape="rounded" thickness="large" value={0.5} />
      </Field>
      <Field validationMessage="Square ProgressBar" validationState="none">
        <ProgressBar className={styles.container} shape="square" thickness="large" value={0.5} />
      </Field>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'The `shape` prop affects the corners of the bar. It can be `rounded` (default) or `square`.',
    },
  },
};
