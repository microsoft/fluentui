import * as React from 'react';
import { Divider } from '@fluentui/react-headless-components-preview/divider';

import styles from '../../../../../../bebop/components/divider.module.css';
import storySource from './DividerDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.column}>
    <p className={styles.section}>Content above</p>
    <Divider className={styles.divider}>
      <span className={styles.label}>Or</span>
    </Divider>
    <p className={styles.section}>Content below</p>

    <Divider className={`${styles.divider} ${styles.start}`}>
      <span className={styles.label}>Section</span>
    </Divider>

    <Divider className={`${styles.divider} ${styles.end}`}>
      <span className={styles.label}>End</span>
    </Divider>

    <Divider className={styles.horizontal} />
  </div>
);

Default.parameters = withStorySource(storySource);
