import * as React from 'react';
import { Rating } from '@fluentui/react-modern-components-preview/rating';

export const Step = (): React.ReactNode => {
  return <Rating step={0.5} defaultValue={3.5} />;
};

Step.parameters = {
  docs: {
    description: {
      story: 'You can specify half values in the Rating with `step={0.5}`.',
    },
  },
};
