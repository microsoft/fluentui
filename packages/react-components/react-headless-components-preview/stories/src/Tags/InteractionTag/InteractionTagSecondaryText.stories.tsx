import * as React from 'react';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag';

import styles from './interactionTag.module.css';

export const SecondaryText = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <InteractionTagPrimary
      className={styles.primary}
      primaryText={{ className: styles.primaryText, children: 'Primary text' }}
      secondaryText={{ className: styles.secondaryText, children: 'Secondary text' }}
    />
  </InteractionTag>
);

SecondaryText.parameters = {
  docs: { description: { story: 'An InteractionTag can have a secondary text.' } },
};
