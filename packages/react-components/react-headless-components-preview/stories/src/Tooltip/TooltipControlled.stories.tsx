import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

export const Controlled = (): React.ReactNode => {
  const [visible, setVisible] = React.useState(false);
  const toggleTooltip = () => setVisible(v => !v);

  return (
    <div className={styles.row}>
      <Tooltip
        content={{
          className: styles.content,
          children: 'Controlled tooltip',
        }}
        relationship="description"
        visible={visible}
        positioning={{ offset: 8 }}
      >
        <button className={`${styles.trigger} ${styles.triggerOutline}`}>Trigger</button>
      </Tooltip>
      <button onClick={toggleTooltip} className={styles.trigger}>
        {visible ? 'Hide' : 'Show'} Tooltip
      </button>
    </div>
  );
};
