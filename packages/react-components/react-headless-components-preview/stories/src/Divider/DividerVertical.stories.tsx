import * as React from 'react';
import { Divider } from '@fluentui/react-headless-components-preview/divider';
import { CircleRegular } from '@fluentui/react-icons';

import styles from './divider.module.css';
import storySource from './DividerVertical.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Vertical = (): React.ReactNode => (
  <div className={styles.verticalGroup}>
    <div className={styles.verticalCol}>
      <span className={styles.verticalCaption}>No text</span>
      <div className={styles.verticalLineWrap}>
        <Divider className={styles.dividerVertical} vertical />
      </div>
    </div>

    <div className={styles.verticalCol}>
      <span className={styles.verticalCaption}>Center</span>
      <div className={styles.verticalLineWrap}>
        <Divider className={styles.dividerVertical} vertical>
          <span className={styles.content}>
            <CircleRegular aria-hidden />
            Text
          </span>
        </Divider>
      </div>
    </div>

    <div className={styles.verticalCol}>
      <span className={styles.verticalCaption}>Start</span>
      <div className={styles.verticalLineWrap}>
        <Divider className={`${styles.dividerVertical} ${styles.start}`} vertical>
          <span className={styles.content}>
            <CircleRegular aria-hidden />
            Text
          </span>
        </Divider>
      </div>
    </div>

    <div className={styles.verticalCol}>
      <span className={styles.verticalCaption}>End</span>
      <div className={styles.verticalLineWrap}>
        <Divider className={`${styles.dividerVertical} ${styles.end}`} vertical>
          <span className={styles.content}>
            <CircleRegular aria-hidden />
            Text
          </span>
        </Divider>
      </div>
    </div>
  </div>
);

Vertical.parameters = withStorySource(storySource);
