import * as React from 'react';
import { Rating } from '@fluentui/react-components';

export const Step = () => {
  return <Rating step={0.5} defaultValue={3.5} />;
};

Step.parameters = {
  docs: {
    description: {
      story: 'You can specify half values in the Rating with `step={0.5}`.',
    },
  },
};
