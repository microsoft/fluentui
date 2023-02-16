import * as React from 'react';
import { ProgressBar } from '@fluentui/react-progress';

export const Indeterminate = () => {
  return <ProgressBar />;
};

Indeterminate.parameters = {
  docs: {
    description: {
      story: `ProgressBar is indeterminate when 'value' is undefined.
      Indeterminate ProgressBar is best used to show that an operation is being executed.`,
    },
  },
};
