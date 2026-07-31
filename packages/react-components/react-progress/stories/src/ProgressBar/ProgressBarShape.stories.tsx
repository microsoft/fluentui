import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar } from '@fluentui/react-components';

import styles from './ProgressBarShape.module.css';

export const Shape = (): JSXElement => {
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
