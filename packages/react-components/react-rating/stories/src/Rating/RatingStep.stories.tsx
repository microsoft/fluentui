import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Rating } from '@fluentui/react-components';

export const Step = (): JSXElement => {
  return <Rating step={0.5} defaultValue={3.5} />;
};

Step.parameters = {
  docs: {
    description: {
      story: 'You can specify half values in the Rating with `step={0.5}`.',
    },
  },
};
