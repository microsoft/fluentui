import * as React from 'react';

import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';

export const Default = () => (
  <Tooltip content="This is an example" relationship="description">
    <Button>Button with a tooltip</Button>
  </Tooltip>
);

Default.parameters = {
  docs: {
    description: {
      story: 'By default, Tooltip appears above its target element, when it is focused or hovered.',
    },
  },
};
