import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Link,
  Switch,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './Reflow.module.css';

export const Reflow = (): JSXElement => {
  const [compact, setCompact] = React.useState(true);
  return (
    <>
      <Switch
        label={compact ? 'Compact width' : 'Full width'}
        checked={compact}
        onChange={(_, { checked }) => setCompact(checked)}
      />
      <div className={[styles.resizableArea, compact && styles.compact].filter(Boolean).join(' ')}>
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Descriptive title</MessageBarTitle>
            Message providing information to the user with actionable insights. <Link>Link</Link>
          </MessageBarBody>
          <MessageBarActions
            containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
          >
            <Button>Action</Button>
            <Button>Action</Button>
          </MessageBarActions>
        </MessageBar>
      </div>
    </>
  );
};

Reflow.parameters = {
  docs: {
    description: {
      story: [
        'The `MessageBar` will reflow by default once the body content wraps to a second line. This changes the layout',
        'of the actions in the MessageBar.',
      ].join('\n'),
    },
  },
};
