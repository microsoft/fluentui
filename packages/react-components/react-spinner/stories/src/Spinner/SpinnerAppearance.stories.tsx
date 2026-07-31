import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';

import styles from './SpinnerAppearance.module.css';

export const Appearance = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Spinner appearance="primary" label="Primary Spinner" />

      <div className={styles.invertedWrapper}>
        <Spinner appearance="inverted" label="Inverted Spinner" />
      </div>
    </div>
  );
};
