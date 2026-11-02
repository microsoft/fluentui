import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from './tag.module.css';

export const Icon = (): React.ReactNode => (
  <Tag className={styles.tag} icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}>
    Primary text
  </Tag>
);

Icon.parameters = {
  docs: { description: { story: 'A Tag can render a custom icon if provided.' } },
};
