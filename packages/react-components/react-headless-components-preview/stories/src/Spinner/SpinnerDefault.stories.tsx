import * as React from 'react';
import { Spinner } from '@fluentui/react-headless-components-preview/spinner';
import { SpinnerIosRegular } from '@fluentui/react-icons';

import styles from './spinner.module.css';
export const Default = (): React.ReactNode => (
  <div className={styles.demoRow}>
    <Spinner
      className={styles.spinner}
      spinnerTail={{
        className: styles.tail,
        children: <SpinnerIosRegular />,
      }}
    />
    <Spinner
      className={`${styles.spinner} ${styles.large}`}
      spinnerTail={{
        className: styles.tail,
        children: <SpinnerIosRegular />,
      }}
    />
    <Spinner
      className={`${styles.spinner} ${styles.muted}`}
      spinnerTail={{
        className: styles.tail,
        children: <SpinnerIosRegular />,
      }}
    />
  </div>
);
