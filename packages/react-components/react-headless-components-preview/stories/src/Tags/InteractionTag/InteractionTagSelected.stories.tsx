import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import { InteractionTagSecondary } from '@fluentui/react-headless-components-preview/interaction-tag-secondary';
import { CalendarMonthRegular, DismissRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

export const Selected = (): React.ReactNode => (
  <div className={styles.demo}>
    <InteractionTag selected className={styles.interactionTag}>
      <InteractionTagPrimary
        className={styles.primary}
        icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
        hasSecondaryAction
      >
        Selected
      </InteractionTagPrimary>
      <InteractionTagSecondary aria-label="remove" className={styles.secondary}>
        <DismissRegular aria-hidden />
      </InteractionTagSecondary>
    </InteractionTag>
    <InteractionTag className={styles.interactionTag}>
      <InteractionTagPrimary
        className={styles.primary}
        icon={{ className: styles.icon, children: <CalendarMonthRegular aria-hidden /> }}
        hasSecondaryAction
      >
        Not selected
      </InteractionTagPrimary>
      <InteractionTagSecondary aria-label="remove" className={styles.secondary}>
        <DismissRegular aria-hidden />
      </InteractionTagSecondary>
    </InteractionTag>
  </div>
);

Selected.parameters = {
  docs: {
    description: {
      story:
        'A selected InteractionTag exposes `data-selected` on its root for styling. Selection is driven by the `selected` prop or by a TagGroup with `onTagSelect`.',
    },
  },
};
