import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const WithLongText = () => (
  <>
    <ToggleButton>Text</ToggleButton>
    <ToggleButton>Text truncates after it hits the max width token value</ToggleButton>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
