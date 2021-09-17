import * as React from 'react';
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha

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
