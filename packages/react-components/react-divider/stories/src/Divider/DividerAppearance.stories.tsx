import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerAppearance.module.css';

export const Appearance = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider>(default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="subtle">subtle</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="brand">brand</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="strong">strong</Divider>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A divider can have a `brand`, `subtle`, or `strong` appearance.' +
        ' When not specified, it has its default experience.',
    },
  },
};
