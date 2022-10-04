import * as React from 'react';
import { Progress } from '@fluentui/react-progress';

export const Indeterminate = () => {
  return <Progress />;
};

Indeterminate.parameters = {
  docs: {
    description: {
      story: `Progress is indeterminate by default.
      Indeterminate Progress is best used to show that an operation is being executed.`,
    },
  },
};
