import * as React from 'react';

import { InfoLabel } from '@fluentui/react-components/unstable';

export const Required = () => (
  <InfoLabel interactive={false} info="Example info" required>
    Required label
  </InfoLabel>
);

Required.parameters = {
  docs: {
    description: {
      story: 'When marked `required`, the indicator asterisk is placed before the InfoButton.',
    },
  },
};
