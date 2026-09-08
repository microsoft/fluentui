import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

export const Positions = (): React.ReactNode => (
  <div className={styles.row}>
    {(['above', 'below', 'before', 'after'] as const).map(position => (
      <Tooltip
        key={position}
        content={{
          className: styles.content,
          children: `Position: ${position}`,
        }}
        relationship="description"
        positioning={{ position, offset: 8 }}
      >
        <button className={`${styles.trigger} ${styles.capitalize}`}>{position}</button>
      </Tooltip>
    ))}
  </div>
);
