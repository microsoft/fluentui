import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';

export const WithArrow = () => (
  <Tooltip withArrow content="This tooltip has an arrow" relationship="description">
    <Button>With an arrow</Button>
  </Tooltip>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop causes the tooltip to have an arrow pointing to its target.',
    },
  },
};
