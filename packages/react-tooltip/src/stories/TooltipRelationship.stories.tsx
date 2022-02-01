import * as React from 'react';
import { ChatRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Tooltip } from '../Tooltip';

export const Relationship = () => (
  <>
    <Tooltip content="Label for the button" relationship="label">
      <Button icon={<ChatRegular />} />
    </Tooltip>
    <Tooltip content="This is the description of the button" relationship="description">
      <Button>Description</Button>
    </Tooltip>
  </>
);

Relationship.parameters = {
  docs: {
    description: {
      story:
        'The `relationship` prop is required, and controls whether the tooltip is labeling or describing its trigger ' +
        'element. This affects which aria props are set on the trigger, and  primarily affects screen readers.',
    },
  },
};
