import * as React from 'react';
import { Link } from '@fluentui/react-headless-components-preview/link';

import styles from '../../../../../../bebop/components/link.module.css';
import storySource from './LinkDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <Link href="#" className={styles.link}>
      View documentation
    </Link>

    <p className={styles.paragraph}>
      By continuing you agree to our{' '}
      <Link href="#" inline className={`${styles.link} ${styles.inline}`}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="#" inline className={`${styles.link} ${styles.inline}`}>
        Privacy Policy
      </Link>
      .
    </p>

    <Link href="#" disabled className={styles.link}>
      Disabled link
    </Link>
  </div>
);

Default.parameters = withStorySource(storySource);
