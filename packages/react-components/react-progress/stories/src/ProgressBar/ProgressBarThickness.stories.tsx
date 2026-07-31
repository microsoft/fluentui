import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar } from '@fluentui/react-components';

import styles from './ProgressBarThickness.module.css';

export const Thickness = (): JSXElement => {
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
