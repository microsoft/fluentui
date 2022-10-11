import * as React from 'react';
import { Progress } from '@fluentui/react-progress';

export const Max = () => {
  return <Progress max={42} value={13} />;
};

Max.parameters = {
  docs: {
    description: {
      story: `You can specify the maximum value of the determinate Progress.
      This is useful for instances where you want to show capacity, or how much of a total has been
      uploaded/downloaded.`,
    },
  },
};
