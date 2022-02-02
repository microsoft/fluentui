import * as React from 'react';
import { SaveRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Tooltip } from '../Tooltip';

export const RelationshipDescription = () => (
  <>
    <Tooltip content="Save" relationship="label">
      <Button icon={<SaveRegular />} />
    </Tooltip>
    <Tooltip content="This is the description of the button" relationship="description">
      <Button>Description</Button>
    </Tooltip>
  </>
);

RelationshipDescription.storyName = 'Relationship: description';
RelationshipDescription.parameters = {
  docs: {
    description: {
      story: `A tooltip can be used as the description of its trigger. For example, this is used for controls that have
        a visible label, but the tooltip provides additional descriptive information. The tooltip sets itself as the
        trigger's \`aria-describedby\`, so the tooltip is accessible to screen readers and other assistive technology.`,
    },
  },
};
