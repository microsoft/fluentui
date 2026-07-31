import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerVertical.module.css';

export const Vertical = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};

Vertical.parameters = {
  docs: {
    description: {
      story: 'A divider can vertically separate two pieces of content.',
    },
  },
};
