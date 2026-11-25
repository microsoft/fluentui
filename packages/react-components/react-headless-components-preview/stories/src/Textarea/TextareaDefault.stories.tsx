import * as React from 'react';
import { Textarea } from '@fluentui/react-headless-components-preview/textarea';

import styles from './textarea.module.css';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <Textarea placeholder="Write your message…" className={styles.wrap} textarea={{ className: styles.textarea }} />
    <Textarea
      placeholder="This textarea cannot be resized…"
      className={styles.wrap}
      textarea={{ className: `${styles.textarea} ${styles.noResize}` }}
    />
    <Textarea
      placeholder="Disabled textarea"
      disabled
      className={styles.wrap}
      textarea={{ className: styles.textarea }}
    />
  </div>
);
