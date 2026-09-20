import * as React from 'react';

import { InfoLabel } from '@fluentui/react-modern-components-preview/info-label';

export const Required = (): React.ReactNode => (
  <InfoLabel info="Example info" required>
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
