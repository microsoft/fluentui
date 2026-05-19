import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tag.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.demoRow}>
      <Tag className={styles.tag}>Default</Tag>
      <Tag className={styles.tag} selected>
        Selected
      </Tag>
      <Tag className={styles.tag} disabled>
        Disabled
      </Tag>
    </div>

    <div className={styles.demoRow}>
      <Tag
        className={styles.tag}
        dismissible
        dismissIcon={{
          className: styles.dismissIcon,
          children: <DismissRegular aria-hidden />,
        }}
      >
        Dismissible
      </Tag>
      <Tag
        className={styles.tag}
        dismissible
        disabled
        dismissIcon={{
          className: styles.dismissIcon,
          children: <DismissRegular aria-hidden />,
        }}
      >
        Disabled & dismissible
      </Tag>
    </div>
  </div>
);
