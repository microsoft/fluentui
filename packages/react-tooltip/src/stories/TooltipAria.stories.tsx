import * as React from 'react';
import { ChatRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Tooltip } from '../Tooltip';

export const Aria = () => (
  <>
    <Tooltip content="Label for the button" relationship="label">
      <Button icon={<ChatRegular />} />
    </Tooltip>
    <Tooltip content="This is the description of the button" relationship="description">
      <Button>Description</Button>
    </Tooltip>
  </>
);

Aria.parameters = {
  docs: {
    description: {
      story:
        'The `triggerAriaAttribute` can be used to tell screen readers whether the tooltip is the label or ' +
        'description for the element. By default, the tooltip is the label for the target, and the text of ' +
        'the tooltip will be read by screen readers for the target element.',
    },
  },
};
