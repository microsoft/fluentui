import * as React from 'react';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-headless-components-preview/interaction-tag';
import { CalendarMonthRegular, DismissRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

export const Disabled = (): React.ReactNode => (
  <div className={styles.demo}>
    <InteractionTag disabled className={styles.interactionTag}>
      <InteractionTagPrimary
        className={styles.primary}
        icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
        hasSecondaryAction
      >
        Disabled
      </InteractionTagPrimary>
      <InteractionTagSecondary aria-label="remove" className={styles.secondary}>
        <DismissRegular aria-hidden />
      </InteractionTagSecondary>
    </InteractionTag>
  </div>
);

Disabled.parameters = {
  docs: {
    description: {
      story:
        'A disabled InteractionTag forwards `data-disabled` to its primary + secondary actions and blocks click/keyboard handlers.',
    },
  },
};
