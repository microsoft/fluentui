import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-components';

export const RelationshipDescription = () => (
  <Tooltip content="This is the description of the button" relationship="description">
    <Button>Button</Button>
  </Tooltip>
);

RelationshipDescription.storyName = 'Relationship: description';
RelationshipDescription.parameters = {
  docs: {
    description: {
      story: `A tooltip can be used as the description of its trigger. For example, this is used for controls that have
        a visible label, but the tooltip provides additional descriptive information.
        <br />
        The tooltip sets itself as the trigger's \`aria-describedby\`, so the tooltip is accessible to screen readers
        and other assistive technology.`,
    },
  },
};
