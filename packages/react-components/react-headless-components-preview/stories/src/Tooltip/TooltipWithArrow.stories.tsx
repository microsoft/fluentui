import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

const contentClass = [styles.content, styles.contentWithArrow].join(' ');

export const WithArrow = (): React.ReactNode => (
  <div className={styles.row}>
    <Tooltip
      relationship="description"
      content={{ className: contentClass, children: 'Center-aligned tooltip' }}
      withArrow
      positioning={{ position: 'below', offset: 10 }}
    >
      <button className={styles.trigger}>Center-aligned</button>
    </Tooltip>

    <Tooltip
      relationship="description"
      positioning={{ position: 'below', align: 'start', offset: 10 }}
      content={{ className: contentClass, children: 'Start-aligned tooltip' }}
      withArrow
    >
      <button className={styles.trigger}>Start-aligned</button>
    </Tooltip>
  </div>
);
