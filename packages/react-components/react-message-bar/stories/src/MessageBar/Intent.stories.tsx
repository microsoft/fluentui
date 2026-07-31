import * as React from 'react';
import type { JSXElement, MessageBarIntent } from '@fluentui/react-components';
import { MessageBar, MessageBarTitle, MessageBarBody, Link } from '@fluentui/react-components';

import styles from './Intent.module.css';

const useClasses = () => styles;
const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const Intent = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      {intents.map(intent => (
        <MessageBar key={intent} intent={intent}>
          <MessageBarBody>
            <MessageBarTitle>Intent {intent}</MessageBarTitle>
            Message providing information to the user with actionable insights. <Link>Link</Link>
          </MessageBarBody>
        </MessageBar>
      ))}
    </div>
  );
};

Intent.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar components come built-in with preset intents that determine the design and aria live announcement,',
        "While it is recommended to use the preset intents, it's possible to configure the aria live politeness",
        'with the `politeness` prop.',
      ].join('\n'),
    },
  },
};
