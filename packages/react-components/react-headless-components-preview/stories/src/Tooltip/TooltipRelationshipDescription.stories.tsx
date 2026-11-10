import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

import styles from './tooltip.module.css';

export const RelationshipDescription = (): React.ReactNode => (
  <div className={styles.row}>
    <Tooltip
      content={{
        className: styles.content,
        children: 'This is the description of the button',
      }}
      relationship="description"
      positioning={{ offset: 8 }}
    >
      <button className={styles.trigger}>Button</button>
    </Tooltip>
  </div>
);

RelationshipDescription.storyName = 'Relationship: description';
RelationshipDescription.parameters = {
  docs: {
    description: {
      story: `A tooltip can provide supplementary description for its trigger via \`aria-describedby\`.
        Use this when the trigger already has a visible label but needs additional descriptive context
        for screen readers.`,
    },
  },
};
