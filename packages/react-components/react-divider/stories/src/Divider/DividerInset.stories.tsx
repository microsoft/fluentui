import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerInset.module.css';

export const Inset = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider inset />
      </div>
      <div className={styles.example}>
        <Divider inset>Text</Divider>
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};

Inset.parameters = {
  docs: {
    description: {
      story: 'A divider can have its line inset from the edges of its container.',
    },
  },
};
