import * as React from 'react';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  Button,
  Link,
  Switch,
} from '@fluentui/react-components';

const intents = ['info', 'warning', 'error', 'success'] as const;
export const ManualLayout = () => {
  const [single, setSingle] = React.useState(true);
  return (
    <>
      <Switch
        label={single ? 'Single line layout' : 'Multi line layout'}
        checked={single}
        onChange={(_, { checked }) => setSingle(checked)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {intents.map(intent => (
          <MessageBar key={intent} layout={single ? 'singleline' : 'multiline'} intent={intent}>
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
        ))}
      </div>
    </>
  );
};

ManualLayout.parameters = {
  docs: {
    description: {
      story: [
        "It's possible to opt out of automatic reflow with the `layout` prop. This can be useful if an application",
        'has an existing responsive design mechanism.',
      ].join('\n'),
    },
  },
};
