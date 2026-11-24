import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Switch,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

const designCopy =
  'Message providing information to the user with actionable insights. Paragraphs should be less then 100 characters long or roughly 520px wide to be accessible.';
const reportedCopy =
  'Message providing information to the user with actionable insights. Message providing information to the user with actionable insights. Message providing information to the user with actionable insights.';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
});

export const MultilineTextWidth = (): JSXElement => {
  const styles = useStyles();
  const [reported, setReported] = React.useState(false);
  const [automatic, setAutomatic] = React.useState(false);

  return (
    <div className={styles.root}>
      <Switch
        label="Use reported component paragraph"
        checked={reported}
        onChange={(_, { checked }) => setReported(checked)}
      />
      <Switch label="Use automatic layout" checked={automatic} onChange={(_, { checked }) => setAutomatic(checked)} />
      <div data-testid="multiline-text-width-container">
        <MessageBar layout={automatic ? 'auto' : 'multiline'}>
          <MessageBarBody>
            <MessageBarTitle>Descriptive title</MessageBarTitle>
            {reported ? reportedCopy : designCopy} <Link>Link</Link>
          </MessageBarBody>
          <MessageBarActions
            containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
          >
            <Button>Action</Button>
            <Button>Action</Button>
          </MessageBarActions>
        </MessageBar>
      </div>
    </div>
  );
};

MultilineTextWidth.parameters = {
  docs: {
    description: {
      story:
        'Multiline text wraps within a bounded area and shrinks with the container. Enable automatic layout to see the bound removed when the content fits on one line. The example copy comes from the design screenshot in issue #29419; its accessibility wording is not asserted as a standard.',
    },
  },
};
