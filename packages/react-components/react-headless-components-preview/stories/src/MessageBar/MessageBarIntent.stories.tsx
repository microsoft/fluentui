import * as React from 'react';
import { Link } from '@fluentui/react-headless-components-preview/link';
import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-headless-components-preview/message-bar';
import { CheckmarkCircleRegular, ErrorCircleRegular, InfoRegular, WarningRegular } from '@fluentui/react-icons';

import linkStyles from '../Link/link.module.css';
import styles from './message-bar.module.css';
const items = [
  {
    intent: 'info' as const,
    variant: styles.info,
    icon: <InfoRegular aria-hidden />,
    title: 'Info message',
  },
  {
    intent: 'warning' as const,
    variant: styles.warning,
    icon: <WarningRegular aria-hidden />,
    title: 'Warning message',
  },
  {
    intent: 'error' as const,
    variant: styles.danger,
    icon: <ErrorCircleRegular aria-hidden />,
    title: 'Error message',
  },
  {
    intent: 'success' as const,
    variant: styles.success,
    icon: <CheckmarkCircleRegular aria-hidden />,
    title: 'Success message',
  },
];

export const Intent = (): React.ReactNode => (
  <div className={styles.list}>
    {items.map(item => (
      <MessageBar
        key={item.intent}
        intent={item.intent}
        className={`${styles.bar} ${item.variant}`}
        icon={{ className: styles.icon, children: item.icon }}
      >
        <MessageBarBody className={styles.body}>
          <MessageBarTitle className={styles.title}>{item.title}</MessageBarTitle>
          Message providing information to the user with actionable insights.{' '}
          <Link className={`${linkStyles.link} ${linkStyles.inline}`} href="#" inline>
            Learn more
          </Link>
        </MessageBarBody>
      </MessageBar>
    ))}
  </div>
);

Intent.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar components come built-in with preset intents that determine the aria live announcement,',
        "While it is recommended to use the preset intents, it's possible to configure the aria live politeness",
        'with the `politeness` prop.',
      ].join('\n'),
    },
  },
};
