import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-components';

import styles from './DividerCustomStyles.module.css';

export const CustomStyles = (): JSXElement => {
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider className={styles.customWidth}>Custom width (200px)</Divider>
      </div>
      <div className={styles.customHeightExample}>
        <Divider vertical className={styles.customHeight}>
          Custom height (50px)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customFont}>Custom font (14px bold)</Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineColor}>
          Custom line color (<code>var(--color-palette-red-border-2)</code>)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineStyle}>Custom line style (2px dashed)</Divider>
      </div>
    </div>
  );
};

CustomStyles.parameters = {
  docs: {
    description: {
      story: 'A divider can have custom styles applied to both the label and the line.',
    },
  },
};
