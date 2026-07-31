import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerDefault.module.css';

export const Default = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider />
      </div>
      <div className={styles.example}>
        <Divider>Text</Divider>
      </div>
    </div>
  );
};
