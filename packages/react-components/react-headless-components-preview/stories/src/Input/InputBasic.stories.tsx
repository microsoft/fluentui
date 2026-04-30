import * as React from 'react';
import { Input } from '@fluentui/react-headless-components-preview/input';
import { SearchRegular } from '@fluentui/react-icons';

import styles from './input.module.css';
export const Basic = (): React.ReactNode => (
  <div className={`${styles.column} ${styles.demo}`}>
    <Input className={styles.wrap} input={{ className: styles.input }} placeholder="Default input" />
    <Input type="email" placeholder="you@example.com" className={styles.wrap} input={{ className: styles.input }} />
    <Input type="password" placeholder="••••••••" className={styles.wrap} input={{ className: styles.input }} />
    <Input
      placeholder="With prefix"
      className={styles.wrap}
      input={{ className: styles.input }}
      contentBefore={{
        className: styles.affix,
        children: <SearchRegular className={styles.affixIcon} aria-hidden />,
      }}
    />
    <Input
      placeholder="Validation error"
      defaultValue="bad value"
      className={`${styles.wrap} ${styles.wrapError}`}
      input={{ className: styles.input }}
    />
    <Input placeholder="Disabled" disabled className={styles.wrap} input={{ className: styles.input }} />
  </div>
);
