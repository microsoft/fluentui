import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RatingDisplay } from '@fluentui/react-components';

export const Count = (): JSXElement => {
  return <RatingDisplay value={5} count={1160} />;
};

Count.parameters = {
  docs: {
    description: {
      story:
        "You can specify the total number of ratings being displayed with the `count`. The number will be formatted with a thousands separator according to the user's locale.",
    },
  },
};
