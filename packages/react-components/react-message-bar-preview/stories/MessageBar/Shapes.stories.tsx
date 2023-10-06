import * as React from 'react';
import { Button, Field, Link, Radio, RadioGroup } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarProps,
} from '@fluentui/react-message-bar-preview';

export const Shapes = () => {
  const [shape, setShape] = React.useState<MessageBarProps['shape']>('rounded');

  return (
    <>
      <Field label="Select shape">
        <RadioGroup value={shape} onChange={(e, { value }) => setShape(value as MessageBarProps['shape'])}>
          <Radio value="rounded" label="Rounded" />
          <Radio value="square" label="Square" />
        </RadioGroup>
      </Field>
      <MessageBar shape={shape}>
        <MessageBarBody>
          <MessageBarTitle>Descriptive title</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBarBody>
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBar>
    </>
  );
};

Shapes.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar can have either rounded or square corners, please follow the usage guidance for these shapes:',
        '- **_rounded_** used for component level message bars',
        '- **_square_** used for page/app level message bars',
      ].join('\n'),
    },
  },
};
