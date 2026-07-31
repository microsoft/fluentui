import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';

import styles from './SpinnerLabel.module.css';

export const Labels = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Spinner labelPosition="before" label="Label Position Before..." />

      <Spinner labelPosition="after" label="Label Position After..." />

      <Spinner labelPosition="above" label="Label Position Above..." />

      <Spinner labelPosition="below" label="Label Position Below..." />
    </div>
  );
};
