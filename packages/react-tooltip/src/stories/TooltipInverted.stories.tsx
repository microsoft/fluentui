import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';

export const Inverted = () => (
  <Tooltip appearance="inverted" content="This has an inverted appearance" relationship="description">
    <Button>Inverted appearance</Button>
  </Tooltip>
);

Inverted.parameters = {
  docs: {
    description: {
      story: 'The `appearance` prop can be set to `inverted`.',
    },
  },
};
