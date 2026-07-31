import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-components';

import styles from './SpinnerSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Spinner size="extra-tiny" label="Extra Tiny Spinner" />

      <Spinner size="tiny" label="Tiny Spinner" />

      <Spinner size="extra-small" label="Extra Small Spinner" />

      <Spinner size="small" label="Small Spinner" />

      <Spinner size="medium" label="Medium Spinner" />

      <Spinner size="large" label="Large Spinner" />

      <Spinner size="extra-large" label="Extra Large Spinner" />

      <Spinner size="huge" label="Huge Spinner" />
    </div>
  );
};
