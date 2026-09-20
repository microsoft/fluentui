import * as React from 'react';

import { Field, makeStyles } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-modern-components-preview/progress-bar';

const useStyles = makeStyles({
  container: {
    margin: '20px 0px',
  },
});

export const Thickness = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div>
      <Field validationMessage="Medium ProgressBar" validationState="none">
        <ProgressBar className={styles.container} thickness="medium" value={0.7} />
      </Field>

      <Field validationMessage="Large ProgressBar" validationState="none">
        <ProgressBar className={styles.container} thickness="large" value={0.7} />
      </Field>
    </div>
  );
};

Thickness.parameters = {
  docs: {
    description: {
      story: 'The `thickness` prop affects the size of the bar. It can be `medium` (default) or `large`.',
    },
  },
};
