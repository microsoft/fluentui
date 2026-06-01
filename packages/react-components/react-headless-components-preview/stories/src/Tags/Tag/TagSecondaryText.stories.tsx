import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';

import styles from './tag.module.css';

export const SecondaryText = (): React.ReactNode => (
  <Tag
    className={styles.tag}
    primaryText={{ className: styles.primaryText, children: 'Primary text' }}
    secondaryText={{ className: styles.secondaryText, children: 'Secondary text' }}
  />
);

SecondaryText.parameters = {
  docs: { description: { story: 'A Tag can have a secondary text.' } },
};
