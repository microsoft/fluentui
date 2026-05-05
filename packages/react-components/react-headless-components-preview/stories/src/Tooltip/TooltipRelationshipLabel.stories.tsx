import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

export const RelationshipLabel = (): React.ReactNode => (
  <div className={styles.row}>
    <Tooltip content={{ className: styles.content, children: 'Bold' }} relationship="label" positioning={{ offset: 8 }}>
      <button className={`${styles.trigger} ${styles.triggerOutline} ${styles.triggerIcon} ${styles.bold}`}>B</button>
    </Tooltip>
    <Tooltip
      content={{ className: styles.content, children: 'Italic' }}
      relationship="label"
      positioning={{ offset: 8 }}
    >
      <button className={`${styles.trigger} ${styles.triggerOutline} ${styles.triggerIcon} ${styles.italic}`}>I</button>
    </Tooltip>
    <Tooltip
      content={{ className: styles.content, children: 'Underline' }}
      relationship="label"
      positioning={{ offset: 8 }}
    >
      <button className={`${styles.trigger} ${styles.triggerOutline} ${styles.triggerIcon} ${styles.underline}`}>
        U
      </button>
    </Tooltip>
  </div>
);

RelationshipLabel.storyName = 'Relationship: label';
RelationshipLabel.parameters = {
  docs: {
    description: {
      story: `A tooltip can serve as the accessible label for its trigger. Use this for icon-only buttons
        with no visible label text. The tooltip sets \`aria-label\` on the trigger so screen readers
        announce the label even when the tooltip is not visible.`,
    },
  },
};
