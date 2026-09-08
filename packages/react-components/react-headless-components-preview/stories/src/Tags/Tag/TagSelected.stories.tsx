import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from './tag.module.css';

export const Selected = (): React.ReactNode => (
  <div className={styles.demoRow}>
    <Tag
      className={styles.tag}
      selected
      icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
    >
      Selected
    </Tag>
    <Tag className={styles.tag} icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}>
      Not selected
    </Tag>
  </div>
);

Selected.parameters = {
  docs: {
    description: {
      story:
        'A selected Tag exposes `data-selected` on its root and sets `aria-pressed="true"` (or `aria-selected` when the parent TagGroup uses `role="listbox"`).',
    },
  },
};
