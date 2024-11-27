import * as React from 'react';
import { Rating } from '@fluentui/react-components';

export const ItemLabel = () => {
  return <Rating itemLabel={num => `item #${num}`} />;
};

ItemLabel.parameters = {
  docs: {
    description: {
      story: 'You can change the `aria-label` for each rating item using the `itemLabel` prop',
    },
  },
};
