import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';

import styles from './interactionTag.module.css';

export const Media = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <InteractionTagPrimary
      className={styles.primary}
      media={{ className: styles.media, 'aria-hidden': 'true', children: 'KA' }}
    >
      Primary text
    </InteractionTagPrimary>
  </InteractionTag>
);

Media.parameters = {
  docs: {
    description: {
      story:
        'An InteractionTag can render arbitrary media in its `media` slot. The headless package does not ship an Avatar primitive - consumers project whatever element fits their design.',
    },
  },
};
