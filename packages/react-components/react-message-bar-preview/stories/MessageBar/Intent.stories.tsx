import * as React from 'react';
import { Button, Link, makeStyles, shorthands } from '@fluentui/react-components';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
  MessageBarActions,
} from '@fluentui/react-message-bar-preview';
import { DismissRegular } from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    resize: 'horizontal',
    ...shorthands.overflow('hidden'),
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
            <MessageBarTitle>{intent}</MessageBarTitle>
            Message providing information to the user with actionable insights. <Link>Link</Link>
          </MessageBarBody>
          <MessageBarActions containerAction={<Button icon={<DismissRegular />} />}>
            <Button>Action</Button>
            <Button>Action</Button>
          </MessageBarActions>
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
