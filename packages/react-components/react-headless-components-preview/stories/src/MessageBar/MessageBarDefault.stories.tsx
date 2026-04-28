import * as React from 'react';
import { Link } from '@fluentui/react-headless-components-preview/link';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview/message-bar';
import { DismissRegular, InfoRegular } from '@fluentui/react-icons';

import linkStyles from '../../../../../../bebop/components/link.module.css';
import styles from '../../../../../../bebop/components/message-bar.module.css';
import storySource from './MessageBarDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <MessageBar
    className={`${styles.bar} ${styles.info}`}
    icon={{ className: styles.icon, children: <InfoRegular aria-hidden /> }}
  >
    <MessageBarBody className={styles.body}>
      <MessageBarTitle className={styles.title}>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights.{' '}
      <Link className={`${linkStyles.link} ${linkStyles.inline}`} href="#" inline>
        Learn more
      </Link>
    </MessageBarBody>
    <MessageBarActions className={styles.actions}>
      <button type="button" className={styles.actionBtn}>
        Action
      </button>
      <button type="button" className={styles.iconBtn} aria-label="Dismiss">
        <DismissRegular aria-hidden />
      </button>
    </MessageBarActions>
  </MessageBar>
);

Default.parameters = withStorySource(storySource);
