import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { CalendarMonthRegular, DismissRegular } from '@fluentui/react-icons';

import styles from './tag.module.css';

export const Disabled = (): React.ReactNode => (
  <div className={styles.demoRow}>
    <Tag
      className={styles.tag}
      disabled
      icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
    >
      Disabled
    </Tag>
    <Tag
      className={styles.tag}
      disabled
      dismissible
      icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
      dismissIcon={{
        className: styles.dismissIcon,
        'aria-label': 'remove',
        children: <DismissRegular aria-hidden />,
      }}
    >
      Disabled & dismissible
    </Tag>
  </div>
);

Disabled.parameters = {
  docs: {
    description: { story: 'A disabled Tag exposes `data-disabled` for styling and blocks the dismiss handler.' },
  },
};
