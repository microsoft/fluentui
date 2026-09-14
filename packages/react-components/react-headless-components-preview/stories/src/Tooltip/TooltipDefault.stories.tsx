import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.row}>
    <Tooltip
      content={{
        className: styles.content,
        children: 'This is the tooltip label',
      }}
      relationship="description"
      positioning={{ offset: 8 }}
    >
      <button className={styles.trigger}>Hover or focus me</button>
    </Tooltip>
  </div>
);
