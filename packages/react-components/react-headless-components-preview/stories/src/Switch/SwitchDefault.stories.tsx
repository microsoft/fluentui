import * as React from 'react';
import { Switch } from '@fluentui/react-headless-components-preview/switch';

import styles from '../../../../../../bebop/components/switch.module.css';
import storySource from './SwitchDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.list}>
    <Switch
      defaultChecked
      label={{
        className: styles.label,
        children: (
          <>
            <span className={styles.title}>Enable notifications</span>
            <span className={styles.subtitle}>Email me when something changes.</span>
          </>
        ),
      }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{ className: styles.indicator }}
    />
    <Switch
      label={{
        className: styles.label,
        children: <span className={styles.title}>Show preview</span>,
      }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{ className: styles.indicator }}
    />
    <Switch
      disabled
      label={{
        className: styles.label,
        children: <span className={styles.title}>Disabled toggle</span>,
      }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{ className: styles.indicator }}
    />
  </div>
);

Default.parameters = withStorySource(storySource);
