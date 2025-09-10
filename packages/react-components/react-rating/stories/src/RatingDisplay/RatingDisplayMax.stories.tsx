import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Max = (): JSXElement => {
  return <RatingDisplay max={10} value={5} />;
};

Max.parameters = {
  docs: {
    description: {
      story: 'You can specify the number of elements in the RatingDisplay with the `max` prop.',
    },
  },
};
