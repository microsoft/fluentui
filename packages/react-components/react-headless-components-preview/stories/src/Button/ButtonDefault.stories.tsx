import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview/button';
import { AddRegular } from '@fluentui/react-icons';

import styles from './button.module.css';
import storySource from './ButtonDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.demoRow}>
      <Button className={styles.button}>Primary</Button>
      <Button className={`${styles.button} ${styles.secondary}`}>Secondary</Button>
      <Button className={`${styles.button} ${styles.subtle}`}>Subtle</Button>
      <Button className={`${styles.button} ${styles.outline}`}>Outline</Button>
    </div>

    <div className={styles.demoRow}>
      <Button className={`${styles.button} ${styles.small}`}>Small</Button>
      <Button className={styles.button}>Medium</Button>
      <Button className={`${styles.button} ${styles.large}`}>Large</Button>
    </div>

    <div className={styles.demoRow}>
      <Button
        className={styles.button}
        icon={{ children: <AddRegular className={styles.icon} aria-hidden />, className: styles.icon }}
      >
        New project
      </Button>
      <Button
        className={styles.button}
        aria-label="Add"
        icon={{ children: <AddRegular className={styles.icon} aria-hidden />, className: styles.icon }}
      />
      <Button
        className={`${styles.button} ${styles.secondary} ${styles.small} ${styles.iconOnlySmall}`}
        aria-label="Add"
        icon={{ children: <AddRegular className={styles.icon} aria-hidden />, className: styles.icon }}
      />
    </div>

    <div className={styles.demoRow}>
      <Button className={styles.button} disabled>
        Disabled
      </Button>
      <Button className={styles.button} disabled disabledFocusable>
        Disabled focusable
      </Button>
    </div>
  </div>
);

Default.parameters = withStorySource(storySource);
