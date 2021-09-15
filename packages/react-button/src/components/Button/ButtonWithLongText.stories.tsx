import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';

export const WithLongText = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button>Text</Button>
    <Button>Text truncates after it hits the max width token value</Button>
  </div>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
