import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';

import styles from './tag.module.css';

export const Media = (): React.ReactNode => (
  <Tag
    className={styles.tag}
    media={{
      className: styles.media,
      'aria-hidden': 'true',
      children: 'KA',
    }}
  >
    Primary text
  </Tag>
);

Media.parameters = {
  docs: {
    description: {
      story:
        'A Tag can render arbitrary media in its `media` slot. Headless does not ship an Avatar primitive - consumers project whatever element fits their design (here, an initials chip).',
    },
  },
};
