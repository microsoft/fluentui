import * as React from 'react';
import { Rating } from '@fluentui/react-modern-components-preview/rating';

export const Max = (): React.ReactNode => {
  return <Rating max={10} defaultValue={5} />;
};

Max.parameters = {
  docs: {
    description: {
      story: 'You can specify the number of elements in the Rating with the `max` prop.',
    },
  },
};
