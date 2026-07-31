import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar } from '@fluentui/react-components';

import styles from './ProgressBarColor.module.css';

export const Color = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Field validationMessage="Error ProgressBar">
        <ProgressBar value={0.75} color="error" />
      </Field>

      <Field validationMessage="Warning ProgressBar" validationState="warning">
        <ProgressBar value={0.95} color="warning" />
      </Field>

      <Field validationMessage="Success ProgressBar" validationState="success">
        <ProgressBar value={1} color="success" />
      </Field>
    </div>
  );
};

Color.parameters = {
  docs: {
    name: 'Validation State',
    description: {
      story:
        'The `color` prop can be used to indicate a `"brand"` state (default), `"error"` state (red), `"warning"` state (orange), ' +
        'or `"success"` state (green).',
    },
  },
};
