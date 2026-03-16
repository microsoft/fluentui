import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { InfoLabel } from '@fluentui/react-components';

export const Required = (): JSXElement => (
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
