import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const WithLongText = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content">Text</CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content">
      Text truncates after it hits the max width token value
    </CompoundButton>
  </>
);
WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text truncates after it hits the max width theme token value.',
    },
  },
};
