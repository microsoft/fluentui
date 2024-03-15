import * as React from 'react';
import { Rating } from '@fluentui/react-components';

export const Max = () => {
  return <Rating max={10} defaultValue={5} />;
};

Max.parameters = {
  docs: {
    description: {
      story: 'You can specify the number of elements in the Rating with the `max` prop.',
    },
  },
};
