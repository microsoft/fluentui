import * as React from 'react';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

export const Icon = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <InteractionTagPrimary
      className={styles.primary}
      icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
    >
      Primary text
    </InteractionTagPrimary>
  </InteractionTag>
);

Icon.parameters = {
  docs: { description: { story: 'An InteractionTag can render a custom icon if provided.' } },
};
