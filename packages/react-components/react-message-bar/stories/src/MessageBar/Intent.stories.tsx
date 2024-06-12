import * as React from 'react';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  Link,
  makeStyles,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});
const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const Intent = () => {
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
