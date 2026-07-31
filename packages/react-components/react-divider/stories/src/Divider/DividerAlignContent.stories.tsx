import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerAlignContent.module.css';

export const AlignContent = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider alignContent="start">start</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center">center (default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end">end</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="start" vertical>
          start
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center" vertical>
          center (default)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end" vertical>
          end
        </Divider>
      </div>
    </div>
  );
};

AlignContent.parameters = {
  docs: {
    description: {
      story:
        'The label associated with the divider can be aligned at the `start`, `center`, or `end` of the divider line.',
    },
  },
};
